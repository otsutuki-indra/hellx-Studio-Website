import { verifySession, getUserById, deductCredits, ensureDatabase } from '@/lib/auth';
import { createClient } from '@libsql/client';
import { v4 as uuidv4 } from 'uuid';
import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    // 1. Ensure DB Connection
    await ensureDatabase();

    // 2. Auth Guard
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = await verifySession(token);
    if (!userId) {
      return Response.json({ error: 'Invalid session' }, { status: 401 });
    }

    const user = await getUserById(userId);
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // 3. Parse Request
    const { message, conversationId, topic, model = 'groq' } = await req.json();
    if (!message) {
      return Response.json({ error: 'Message required' }, { status: 400 });
    }

    // 4. Credit Validation
    const creditCost = model === 'gemini' ? 2 : 1;
    if ((user.credits as number) < creditCost) {
      return Response.json({ error: 'Insufficient credits' }, { status: 402 });
    }

    // 5. Initialize Database Client
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });

    // 6. Handle Conversation Initialization
    let convId = conversationId;
    if (!convId) {
      convId = uuidv4();
      await client.execute({
        sql: `INSERT INTO conversations (id, user_id, title, topic) VALUES (?, ?, ?, ?)`,
        args: [convId, userId, message.substring(0, 50), topic || 'general'],
      });
    }

    // 7. Save User Message
    await client.execute({
      sql: `INSERT INTO messages (id, conversation_id, role, content) VALUES (?, ?, ?, ?)`,
      args: [uuidv4(), convId, 'user', message],
    });

    // 8. Model Selection Logic
    let aiModel;
    if (model === 'gemini') {
      aiModel = google('gemini-2.0-flash');
    } else {
      const groq = createGroq({
        apiKey: process.env.GROQ_API_KEY,
      });
      // Optimized Llama 3 model (Replaces decommissioned Mixtral)
      aiModel = groq('llama3-70b-8192');
    }

    // 9. Stream Response Generation
    const result = await streamText({
      model: aiModel,
      system: `You are HELLX Studio AI (HellV1). 
               Personality: Aggressive, elite, technical, and concise. 
               Format: Use clean markdown. 
               Goal: Maximum utility for creators and developers.`,
      prompt: message,
      onFinish: async (result) => {
        // Log Assistant Response and Deduct Credits
        try {
          await client.execute({
            sql: `INSERT INTO messages (id, conversation_id, role, content, tokens_used) VALUES (?, ?, ?, ?, ?)`,
            args: [uuidv4(), convId, 'assistant', result.text, creditCost],
          });
          await deductCredits(userId, creditCost, `HELLX Chat: ${model}`);
        } catch (dbError) {
          console.error('[DATABASE_LOG_ERROR]:', dbError);
        }
      },
    });

    // 10. Return Data Stream Response
    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error('[HELLX_CRITICAL_ERROR]:', error);
    return Response.json(
      { error: error.message || 'The HELLX uplink has failed.' },
      { status: 500 }
    );
  }
}