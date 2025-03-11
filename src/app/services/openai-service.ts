import OpenAI from "openai";

export const openaiClient = () => {
  // 環境変数から取得
  const apiKey = process.env.OPENAI_API_KEY;

  // 環境変数が設定されていない場合は、開発用のフォールバックメッセージを返す関数を作成
  if (!apiKey) {
    console.warn("OpenAI APIキーが設定されていません。ダミー応答を返します。");
    return null; // 本番環境では使用しないでください
  }

  return new OpenAI({
    apiKey: apiKey,
  });
};

export const sendPromptToGpt = async (prompt: string) => {
  try {
    const openai = openaiClient();

    // APIキーが設定されていない場合
    if (!openai) {
      return "開発モード: OpenAI APIキーが設定されていないため、リアルな応答ができません。.env.localファイルにAPIキーを設定し、サーバーを再起動してください。";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const gptResponseMessage = completion.choices[0].message.content;
    return gptResponseMessage;
  } catch (error) {
    console.error("Error in sendPromptToGpt:", error);
    return "申し訳ありませんが、現在リクエストを処理できません。後でもう一度お試しください。";
  }
};
