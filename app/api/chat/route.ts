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
    // ============ AUTHENTICATION ============
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

    // ============ REQUEST VALIDATION ============
    const body = await request.json();
    const { message, conversationId, model = 'groq', topic = 'general' } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // ============ CREDIT CHECK ============
    let userResult;
    try {
      userResult = await db.execute({
        sql: 'SELECT credits FROM users WHERE id = ?',
        args: [userId],
      });
    } catch (dbError) {
      console.error('[CHAT_API] Database fetch error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 503 }
      );
    }

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const credits = (userResult.rows[0].credits as number) || 0;
    if (credits < 1) {
      return NextResponse.json(
        { error: 'Insufficient credits. Please purchase more.' },
        { status: 402 }
      );
    }

    // ============ CONVERSATION SETUP ============
    let convId = conversationId;
    if (!convId) {
      convId = uuidv4();
      try {
        await db.execute({
          sql: `INSERT INTO conversations (id, user_id, title, topic, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?)`,
          args: [
            convId,
            userId,
            message.substring(0, 50) + (message.length > 50 ? '...' : ''),
            topic,
            Math.floor(Date.now() / 1000),
            Math.floor(Date.now() / 1000),
          ],
        });
      } catch (dbError) {
        console.error('[CHAT_API] Conversation creation error:', dbError);
      }
    }

    // ============ SAVE USER MESSAGE ============
    const userMsgId = uuidv4();
    try {
      await db.execute({
        sql: `INSERT INTO messages (id, conversation_id, role, content, created_at) 
              VALUES (?, ?, ?, ?, ?)`,
        args: [userMsgId, convId, 'user', message, Math.floor(Date.now() / 1000)],
      });
    } catch (dbError) {
      console.error('[CHAT_API] User message save error:', dbError);
    }

    // ============ SELECT AI MODEL ============
    const selectedModel =
      model === 'gemini' ? google('gemini-2.0-flash') : groq('llama3-70b-8192');

    // ============ STREAM TEXT GENERATION ============
    const result = streamText({
      model: selectedModel,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      maxTokens: 1024,
      system:
        'You are HELLX, an advanced AI creative assistant. Be concise, helpful, and insightful.',
      
      // ============ HANDLE STREAM COMPLETION ============
      onFinish: async (event) => {
        try {
          const assistantMsgId = uuidv4();
          const responseText = event.text || '';
          const estimatedTokens = Math.ceil(responseText.length / 4);

          await db.execute({
            sql: `INSERT INTO messages (id, conversation_id, role, content, tokens_used, created_at) 
                  VALUES (?, ?, ?, ?, ?, ?)`,
            args: [
              assistantMsgId,
              convId,
              'assistant',
              responseText,
              estimatedTokens,
              Math.floor(Date.now() / 1000),
            ],
          });

          // ============ DEDUCT CREDITS ============
          const txId = uuidv4();
          const modelName = model === 'gemini' ? 'Research (Gemini)' : 'HellV1 (Groq)';

          try {
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
                  `AI Query via ${modelName}`,
                  Math.floor(Date.now() / 1000),
                ],
              },
            ]);

            console.log(`[CHAT_API] ✅ Processed query for user ${userId}`);
          } catch (creditError) {
            console.error('[CHAT_API] Credit deduction error:', creditError);
          }
        } catch (finishError) {
          console.error('[CHAT_API] onFinish error:', finishError);
        }
      },
    });

    // ============ RETURN STREAMING RESPONSE ============
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('[CHAT_API] Critical error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
