"use client";

import React from "react";
import { RecoilRoot } from "recoil";
import ChatMessage from "../components/ChatMessage";
import ChatForm from "../components/ChatForm";

const ChatClient = () => {
  return (
    <RecoilRoot>
      {/* <!-- メッセージエリア --> */}
      <div className='flex-grow overflow-auto p-6 space-y-5 '>
        <ChatMessage />
      </div>

      {/* <!-- テキスト入力エリア --> */}
      <ChatForm />
    </RecoilRoot>
  );
};

export default ChatClient;
