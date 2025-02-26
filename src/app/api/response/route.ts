// app/api/response/route.ts

import { NextResponse } from "next/server";
import { sendPromptToGpt } from "@/app/services/openai-service";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const gptResponseMessage = await sendPromptToGpt(prompt);
  const response = NextResponse.json({ gptResponseMessage });
  return response;
}
