import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Edit3 } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';

interface WorkspaceHeaderProps {
  onSave: () => void;
  fileName: string;
  _id: Id<"files">;
}

function WorkspaceHeader({ onSave, fileName, _id }: WorkspaceHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState(fileName);
  const router = useRouter();

  const renameFile = useMutation(api.files.renameFile);

  const handleMouseMove = (e: MouseEvent) => {
    if (e.clientY < 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleRename = async () => {
    if (newFileName !== fileName) {
      try {
        await renameFile({ _id, newFileName });
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to rename file", error);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`p-3 flex justify-between items-center fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{
        backgroundColor: 'rgba(34, 34, 34, 0.95)', // Dark background with slight transparency
        color: '#e0e0e0', // Light gray text for better contrast
        width: '80%',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Soft shadow for modern look
      }}
    >
      <div className="flex gap-2 items-center">
        <Image
          src="/img.png"
          alt="user"
          width={30}
          height={30}
          className="rounded-full border border-gray-600" // Soft border for user image
        />
        {!isEditing ? (
          <h1
            className="h-8 text-[16px] gap-2 text-white font-bold px-2 flex items-center cursor-pointer"
            onDoubleClick={() => setIsEditing(true)} // Switch to edit mode on double-click
          >
            <strong>{fileName || "Untitled File"}</strong>
          </h1>
        ) : (
          <input
            className="text-[18px] bg-[#2a2a2a] text-white px-2 py-1 rounded border border-gray-600"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onBlur={handleRename}
            autoFocus
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          className="h-8 text-[12px] gap-2 bg-gray-700 hover:bg-gray-600"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </Button>

        <Button
          className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={onSave}
        >
          <Save className="h-4 w-4" /> Save
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
