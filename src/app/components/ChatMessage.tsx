"use client";
import React, { useState, useEffect } from "react";
import { chatLogState, Message } from "../states/ChatLogState";

// CustomEventのインターフェースを定義
interface ChatUpdateEvent extends CustomEvent {
  detail: Message[];
}

const ChatMessage = () => {
  // 初期値をchatLogStateの初期メッセージに設定
  const [messages, setMessages] = useState<Message[]>(
    chatLogState.initialMessages
  );

  useEffect(() => {
    // Subscribe to updates from a custom event
    const handleMessageUpdate = (event: ChatUpdateEvent) => {
      if (event.detail) {
        setMessages(event.detail);
      }
    };

    window.addEventListener(
      "chat-update",
      handleMessageUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "chat-update",
        handleMessageUpdate as EventListener
      );
    };
  }, []);

  // 安全にレンダリングするためにmessagesが配列かどうか確認
  const messageList = Array.isArray(messages) ? messages : [];

  return (
    <>
      {messageList.map((message: Message) => (
        <div
          key={message.id}
          className={`flex items-end ${
            message.sender === "user" ? "justify-end" : ""
          }`}
        >
          {message.sender === "other" && (
            <div className='flex-shrink-0 mr-2'>
              <div className='h-8 w-8 bg-gray-300 rounded-full' />
              {/* アイコンの代わり */}
            </div>
          )}
          <div
            className={`rounded p-2 ${
              message.sender === "user"
                ? "bg-blue-200"
                : "bg-gray-500 text-white"
            }`}
          >
            <p className='text-sm'>{message.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatMessage;
