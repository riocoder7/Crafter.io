import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function WorkspaceHeader({ onSave, fileName }: { onSave: any; fileName: string }) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter(); // Initialize useRouter

  const handleMouseMove = (e: MouseEvent) => {
    // Trigger visibility when the user hovers near the top (20px from top)
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

  return (
    <div
      className={`p-2 border-b flex justify-between items-center fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{
        backgroundColor: 'rgba(27, 33, 43, 0.9)', // Transparent dark background
        color: 'hsl(0, 0%, 98%)', // Lighter text color
        width: '80%', // Reduce the width
        borderRadius: '0.5rem', // Add rounded corners
        boxShadow: 'none', // Remove any shadow
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
        <h1 className="
          h-8 
          text-[18px]
          gap-2 
          bg-transparent 
          text-white 
          font-bold 
          px-2
          flex 
          items-center
        ">
          <strong>{fileName || 'Untitled'}</strong> {/* Display actual file name or default */}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="h-8 text-[12px]
          gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={() => router.back()} // Navigate to the previous page
        >
          <ArrowLeft className="h-4 w-4" /> Files
        </Button>
        <Button
          className="h-8 text-[12px]
          gap-2 bg-yellow-500 hover:bg-yellow-600"
          onClick={() => onSave()}
        >
          <Save className="h-4 w-4" /> Save
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
