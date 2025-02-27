"use client";

import React from "react";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";

const ChatClient = () => {
  return (
    <>
      {/* <!-- メッセージエリア --> */}
      <div className='flex-grow overflow-auto p-6 space-y-5'>
        <ChatMessage />
      </div>

      {/* <!-- テキスト入力エリア --> */}
      <ChatForm />
    </>
  );
};

export default ChatClient;
