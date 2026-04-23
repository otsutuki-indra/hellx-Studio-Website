import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { google } from '@ai-sdk/google';
import { createClient } from '@libsql/client';
import { verifyToken } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
});

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // Extract and verify auth
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const verified = await verifyToken(token);
    if (!verified) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = verified.userId;
    const { message, conversationId, model = 'groq', topic = 'general' } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get user's credits
    const userResult = await db.execute({
      sql: 'SELECT credits FROM users WHERE id = ?',
      args: [userId],
    });

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const credits = (userResult.rows[0].credits as number) || 0;
    if (credits < 1) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 }
      );
    }

    // Create or use existing conversation
    let convId = conversationId;
    if (!convId) {
      convId = uuidv4();
      await db.execute({
        sql: `INSERT INTO conversations (id, user_id, title, topic, created_at, updated_at) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          convId,
          userId,
          message.substring(0, 50),
          topic,
          Math.floor(Date.now() / 1000),
          Math.floor(Date.now() / 1000),
        ],
      });
    }

    // Save user message
    const userMsgId = uuidv4();
    await db.execute({
      sql: `INSERT INTO messages (id, conversation_id, role, content, created_at) 
            VALUES (?, ?, ?, ?, ?)`,
      args: [userMsgId, convId, 'user', message, Math.floor(Date.now() / 1000)],
    });

    // Select model
    const aiModel = model === 'gemini' ? google('gemini-2.0-flash') : groq('llama3-70b-8192');

    // Stream text generation with Vercel AI SDK v3.1+
    const result = streamText({
      model: aiModel,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      maxTokens: 1024,
      system: 'You are HELLX, an advanced AI creative assistant. Be concise, helpful, and insightful.',
      onFinish: async (event) => {
        // Save assistant message on stream completion
        const assistantMsgId = uuidv4();
        const responseText = event.text || '';

        await db.execute({
          sql: `INSERT INTO messages (id, conversation_id, role, content, tokens_used, created_at) 
                VALUES (?, ?, ?, ?, ?, ?)`,
          args: [
            assistantMsgId,
            convId,
            'assistant',
            responseText,
            Math.ceil(responseText.length / 4), // Rough token estimate
            Math.floor(Date.now() / 1000),
          ],
        });

        // Deduct credits (1 credit per query)
        const txId = uuidv4();
        await db.batch([
          {
            sql: `UPDATE users SET credits = credits - 1 WHERE id = ?`,
            args: [userId],
          },
          {
            sql: `INSERT INTO credit_transactions (id, user_id, amount, type, description, created_at)
                  VALUES (?, ?, ?, ?, ?, ?)`,
            args: [
              txId,
              userId,
              -1,
              'usage',
              `AI Query via ${model === 'gemini' ? 'Research' : 'HellV1'}`,
              Math.floor(Date.now() / 1000),
            ],
          },
        ]);
      },
    });

    // Return streaming response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('[CHAT_API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
