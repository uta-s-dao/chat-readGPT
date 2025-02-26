"use client";
import { useEffect, useState } from "react";
import { uploadFile } from "../components/Uploadfile";

export function UploadForm() {
  const [files, setFiles] = useState<string[]>([]);

  // ファイル一覧を取得
  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch("/api/files");
      const data = await response.json();
      setFiles(data.files);
    };
    fetchFiles();
  }, []);
  return (
    <>
      <form action={uploadFile} className='mb-6 bg-blue-100 w-full'>
        <input type='file' name='file' />
        <button type='submit' className='rounded-md bg-slate-50 '>
          アップロード
        </button>

        <div>
          {files.map((file) => (
            <div key={file} className='flex items-center gap-2'>
              <span>{file.slice(0, 9)}…</span>
              <a
                href={`/api/download?file=${file}`}
                className='text-blue-500 hover:text-blue-700'
              >
                ダウンロード
              </a>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}
