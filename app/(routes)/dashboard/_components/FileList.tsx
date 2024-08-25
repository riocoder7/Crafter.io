import { FileListContext } from '@/app/_context/FilesListContext';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
  _lastEditedTime: number; // Add this property if not already present
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<FILE[]>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(fileList_);
  }, [fileList_]);

  return (
    <div className='bg-gray-900 min-h-screen'>
      <div className='mt-10 p-4'>
        <div className="overflow-x-auto bg-gray-800 text-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y-2 divide-gray-700">
            <thead className="text-left">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium">File Name</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">Created At</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">Last Edited</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">Author</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium"></td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {fileList && fileList.map((file: FILE, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-gray-700 cursor-pointer"
                  onClick={() => router.push('/workspace/' + file._id)}
                >
                  <td className="whitespace-nowrap px-4 py-2">{file.fileName}</td>
                  
                  {/* Display creation time */}
                  <td className="whitespace-nowrap px-4 py-2">
                    {moment(file._creationTime).format('DD MMM YYYY, h:mm A')}
                  </td>
                  
                  {/* Display last edited time */}
                  <td className="whitespace-nowrap px-4 py-2">
                  {file._lastEditedTime ? moment(file._lastEditedTime).format('DD MMM YYYY') : 'Never Edited'}

                  </td>
                  
                  <td className="whitespace-nowrap px-4 py-2">
                    {user && (
                      <Image
                        // src={user?.picture}
                        src='/img.png'
                        alt='user'
                        width={30}
                        height={30}
                        className='rounded-full'
                      />
                    )}
                  </td>
                  
                  <td className="whitespace-nowrap px-4 py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className='h-4 w-4' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className='flex items-center gap-3'>
                          <Archive className='h-4 w-4' /> Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FileList;
