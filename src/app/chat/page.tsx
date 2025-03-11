"use client";
import React from "react";
import ChatClient from "../components/ChatClient";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const chat_title = searchParams.get("title") || "デフォルトチャット";
  return (
    <div className='flex flex-col h-screen'>
      {/* <!-- チャットヘッダー --> */}
      <div className='p-3 bg-blue-400 text-white'>
        <h1 className='text-lg'>{chat_title}</h1>
      </div>

      <ChatClient />
    </div>
  );
}

// import ChatPage from "@/app/chat/page";
// export default function ChatList() {
//   return (
//     <div className='w-full'>
//       {/* chat_title:stringと定義した */}
//       <ChatPage chat_title='ryowa' />
//     </div>
//   );
// }
