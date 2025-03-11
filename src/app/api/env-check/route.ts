import { NextResponse } from "next/server";

export async function GET() {
  // 環境変数の存在確認（APIキー自体は公開しない）
  const envInfo = {
    NODE_ENV: process.env.NODE_ENV,
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    envVars: Object.keys(process.env).filter(
      (key) =>
        !key.includes("KEY") &&
        !key.includes("SECRET") &&
        !key.includes("TOKEN")
    ),
  };

  return NextResponse.json(envInfo);
}
