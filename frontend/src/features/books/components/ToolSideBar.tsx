"use client";
import { useAtomValue, useSetAtom } from 'jotai';
import { isPreviewAtom } from '../stores/Atom';
import { FaPen } from "react-icons/fa";
import { IoPlayOutline } from "react-icons/io5";
import Button from '@/features/shared/components/ui/Button';

export const ToolSideBar = () => {
  const isPreview = useAtomValue(isPreviewAtom);
  const setIsPreview = useSetAtom(isPreviewAtom);

  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <div>
        <Button
          onClick={() => setIsPreview(false)}
        >
          <p>保存</p>
        </Button>
      </div>
      <div className="flex items-center gap-1 bg-background-soft rounded-full p-1">
        <button
          onClick={() => setIsPreview(false)}
          className={`p-3 rounded-full transition-colors cursor-pointer ${!isPreview
            && "bg-button-primary/60"
            }`}
        >
          <FaPen size={12} />
        </button>
        <button
          onClick={() => setIsPreview(true)}
          className={`p-3 rounded-full transition-colors cursor-pointer ${isPreview
            && "bg-button-primary/60"
            }`}
        >
          <IoPlayOutline size={12} />
        </button>
      </div>

    </div>
  );
};