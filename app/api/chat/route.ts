import { streamChatResponse } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";
import {
  checkQueryLimit,
  incrementQueryCount,
  logAiChat,
} from "@/lib/actions/user";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Check query limit
    const limitCheck = await checkQueryLimit();
    if (!limitCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "Query limit reached",
          message: `You have reached your ${limitCheck.limit} query limit. Please upgrade your plan for more queries.`,
          remaining: 0,
          limit: limitCheck.limit,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { message, history } = await request.json();

    if (!message) {
      return new Response("Message is required", { status: 400 });
    }

    // Convert history to Gemini format
    const geminiHistory = (history || []).map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })
    );

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamChatResponse(message, geminiHistory)) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(chunk));
          }

          // After streaming is complete, log to database and increment counter
          await Promise.all([
            incrementQueryCount(),
            logAiChat(message, fullResponse),
          ]);

          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
        "X-Queries-Remaining": String(
          limitCheck.remaining === Infinity ? "unlimited" : limitCheck.remaining
        ),
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
