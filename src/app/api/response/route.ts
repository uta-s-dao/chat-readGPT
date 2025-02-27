// app/api/response/route.ts

import { NextResponse } from "next/server";
import { sendPromptToGpt } from "@/app/services/openai-service";

export async function POST(request: Request) {
  console.log("環境変数の確認:", {
    apiKeyExists: !!process.env.OPENAI_API_KEY,
    apiKeyFirstChars: process.env.OPENAI_API_KEY
      ? process.env.OPENAI_API_KEY.substring(0, 5)
      : "未設定",
  });
  const { prompt } = await request.json();

  const gptResponseMessage = await sendPromptToGpt(prompt);
  const response = NextResponse.json({ gptResponseMessage });
  return response;
}
