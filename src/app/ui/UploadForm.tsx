"use client";
import { useEffect, useState } from "react";
import { uploadFile } from "../components/Uploadfile";

// ファイルの型を明示的に定義
type FileType = string;

export function UploadForm({ chatTitle }: { chatTitle: string }) {
  // 明示的に型を宣言
  const [files, setFiles] = useState<FileType[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // ファイル一覧を取得
  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch(
        `/api/files?chat=${encodeURIComponent(chatTitle)}`
      );
      const data = await response.json();
      setFiles(data.files || []);
    };
    fetchFiles();
  }, [chatTitle]);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path>
          <polyline points='13 2 13 9 20 9'></polyline>
        </svg>
        ファイル管理
      </button>

      {isExpanded && (
        <div className='absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-3'>
          <form action={uploadFile} className='mb-3'>
            <input type='hidden' name='chatTitle' value={chatTitle} />
            <div className='flex flex-col gap-2'>
              <input
                type='file'
                name='file'
                className='text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              />
              <button
                type='submit'
                className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm'
              >
                アップロード
              </button>
            </div>
          </form>

          {files.length > 0 && (
            <div className='mt-3 border-t pt-3'>
              <h3 className='text-sm font-semibold mb-2'>
                アップロード済みファイル
              </h3>
              <div className='max-h-40 overflow-y-auto'>
                {files.map((file: FileType) => (
                  <div
                    key={file}
                    className='flex items-center justify-between py-1 text-sm'
                  >
                    <span className='truncate max-w-32' title={file}>
                      {file.length > 15 ? file.slice(0, 12) + "..." : file}
                    </span>
                    <a
                      href={`/api/download?file=${encodeURIComponent(
                        file
                      )}&chat=${encodeURIComponent(chatTitle)}`}
                      className='text-blue-500 hover:text-blue-700'
                    >
                      ↓
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
