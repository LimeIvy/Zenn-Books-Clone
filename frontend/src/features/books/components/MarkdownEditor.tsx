"use client";

import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { PreviewMarkdown } from "@/features/books/components/PreviewMarkdown";
import { SimpleMdeEditor } from "@/features/books/components/SimpleMdeEditor";
import { isPreviewAtom } from '../stores/Atom';

export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");

  const onChange = (value: string) => {
    setMarkdownValue(value);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <input name="name" type="text" className="text-2xl text-white font-bold mb-8" placeholder="Title" />
      {useAtomValue(isPreviewAtom) ? (
        <PreviewMarkdown markdownValue={markdownValue} />
      ) : (
        <SimpleMdeEditor markdownValue={markdownValue} onChange={onChange} />
      )}
    </div>
  );
};