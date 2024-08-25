import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Edit3 } from 'lucide-react';
import Image from 'next/image';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/convex/_generated/api'; // Import your Convex API
import { useMutation } from 'convex/react'; // Import the useMutation hook
import { Id } from '@/convex/_generated/dataModel'; // Import the Id type from Convex

interface WorkspaceHeaderProps {
  onSave: () => void;
  fileName: string;
  _id: Id<"files">; // Use _id instead of fileId, as per Convex's expected structure
}

function WorkspaceHeader({ onSave, fileName, _id }: WorkspaceHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // State to track if we're editing
  const [newFileName, setNewFileName] = useState(fileName); // State for the new file name
  const router = useRouter();

  // Convex mutation to rename the file
  const renameFile = useMutation(api.files.renameFile); // Use Convex mutation for renaming

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
        await renameFile({ _id, newFileName }); // Call the Convex API to rename the file with the correct _id
        setIsEditing(false); // Close the input field after renaming
      } catch (error) {
        console.error("Failed to rename file", error); // Log errors for debugging
      }
    }
  };

  return (
    <div
      className={`p-2 border-b flex justify-between items-center fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{
        backgroundColor: 'rgba(27, 33, 43, 0.9)',
        color: 'hsl(0, 0%, 98%)',
        width: '80%',
        borderRadius: '0.5rem',
        boxShadow: 'none',
      }}
    >
      <div className="flex gap-2 items-center">
        <Image
          src="/img.png"
          alt="user"
          width={30}
          height={30}
          className="rounded-full border border-gray-500"
        />
        {!isEditing ? (
          <h1 className="h-8 text-[18px] gap-2 bg-transparent text-white font-bold px-2 flex items-center">
            <strong>{fileName}</strong> {/* Display the current file name */}
            <Button className="ml-2" onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4" /> Rename
            </Button>
          </h1>
        ) : (
          <input
            className="text-[18px] bg-gray-700 text-white px-2 py-1 rounded"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onBlur={handleRename} // Call the rename function on blur
            autoFocus
          />
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={() => router.back()} // Navigate to the previous page
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </Button>
        <Button
          className="h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600"
          onClick={onSave} // Trigger save action
        >
          <Save className="h-4 w-4" /> Save
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
