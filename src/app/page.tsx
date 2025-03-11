"use client";
import Link from "next/link";
import { UploadForm } from "@/app/ui/UploadForm";

export default function ChatList() {
  // シンプルなチャットリスト
  const chatOptions = ["Ryowa", "Hoa", "プロジェクト"];

  return (
    <div className='w-full p-4 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6'>チャット一覧</h2>

      {/* チャットリスト */}
      <div className='space-y-3'>
        {chatOptions.map((chat) => (
          <div
            key={chat}
            className='flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-slate-50 hover:bg-slate-100 transition-colors'
          >
            <span className='text-xl font-medium'>{chat}</span>

            <div className='flex items-center gap-3'>
              {/* ファイルアップロードのボタン */}
              <UploadForm chatTitle={chat} />

              {/* チャットページへのリンク（URLパラメータでタイトルを渡す） */}
              <Link
                href={`/chat?title=${encodeURIComponent(chat)}`}
                className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
              >
                開く
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
