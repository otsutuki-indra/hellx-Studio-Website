import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not set. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are HELLX AI, the intelligent assistant for HELLX STUDIO - a cutting-edge digital laboratory specializing in AI-powered creative solutions.

Your personality:
- Professional yet approachable
- Tech-savvy and knowledgeable about modern web development, AI, and digital design
- Concise but thorough in explanations
- Creative and forward-thinking

Your expertise areas:
- Web development (Next.js, React, TypeScript)
- AI integration and automation
- Digital design and UX
- Cloud architecture and scalable systems
- Creative problem-solving

Always maintain a futuristic, innovative tone that aligns with HELLX STUDIO's brand as a "Digital Laboratory."`,
});

export async function* streamChatResponse(
  message: string,
  history: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>
) {
  const chat = geminiModel.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessageStream(message);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      yield text;
    }
  }
}
