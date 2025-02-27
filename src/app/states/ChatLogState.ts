// states/ChatLogState.ts
// Recoilを使わずに通常のオブジェクトとして実装

// メッセージオブジェクトの型を定義
export interface Message {
  id: number;
  content: string;
  sender: string;
}

// 初期メッセージの配列
export const chatLogState = {
  initialMessages: [
    { id: 1, content: "こんにちは！", sender: "user" },
    { id: 2, content: "元気ですか？", sender: "other" },
  ] as Message[],
};
