// メッセージオブジェクトの型を定義
export interface Message {
  id: number;
  content: string;
  sender: string;
}

// 初期メッセージの配列
export const chatLogState = {
  initialMessages: [
    { id: 1, content: "質問を教えてください !", sender: "other" },
  ] as Message[],
};
