"use client";
import React, { useState } from "react";
import { chatLogState, Message } from "../states/ChatLogState";

// CustomEventのインターフェースを定義
interface ChatUpdateEvent extends CustomEvent {
  detail: Message[];
}

const ChatForm = () => {
  const [input, setInput] = useState<string>("");
  // 初期値をchatLogStateの初期メッセージに設定
  const [chatLog, setChatLog] = useState<Message[]>(
    chatLogState.initialMessages
  );

  // Update messages and dispatch a custom event to notify ChatMessage
  const updateMessages = (newMessages: Message[]) => {
    setChatLog(newMessages);
    window.dispatchEvent(
      new CustomEvent("chat-update", { detail: newMessages }) as ChatUpdateEvent
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 安全にchatLogの長さを確認
    const chatLogArray = Array.isArray(chatLog) ? chatLog : [];
    const chatLogLength = chatLogArray.length;

    // 新しいIDを安全に計算
    const newId =
      chatLogLength > 0 ? chatLogArray[chatLogLength - 1].id + 1 : 1;

    const newUserMessage = { id: newId, content: input, sender: "user" };
    const updatedMessages = [...chatLogArray, newUserMessage];
    updateMessages(updatedMessages);
    setInput("");

    try {
      const res = await fetch(`/api/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error("Response error");
      }

      const result = await res.json();
      const newGptId = newId + 1;
      const newGptMessage = {
        id: newGptId,
        content: result.gptResponseMessage,
        sender: "other",
      };
      updateMessages([...updatedMessages, newGptMessage]);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-3 bg-gray-200 flex justify-between items-center'
    >
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='w-full p-2 mr-2 rounded focus:outline-none text-gray-800'
        placeholder='メッセージを入力...'
      />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        送信
      </button>
    </form>
  );
};

export default ChatForm;
