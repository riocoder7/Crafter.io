import React, { useContext, useEffect, useState } from "react";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, File, MoreHorizontal } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
  _lastEditedTime: number;
  _proirity: string;
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<FILE[]>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_);
    }
  }, [fileList_]);

  const handlePriorityChange = (id: string, priority: string) => {
    const updatedList = fileList?.map((file) =>
      file._id === id ? { ...file, _proirity: priority } : file
    );
    setFileList(updatedList);
    setFileList_?.(updatedList); // Update the context if necessary
  };

  const handleArchive = (fileId: string) => {
    console.log(`Archiving file with ID: ${fileId}`);
    // Implement archiving logic
  };

  const priorityFill: Record<string, string> = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
    Unassigned: "bg-gray-500",
  };

  const priorityTextColor: Record<string, string> = {
    High: "text-red-400",
    Medium: "text-yellow-400",
    Low: "text-green-400",
    Unassigned: "text-gray-400",
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mt-10 p-4">
        <div className="overflow-x-auto bg-gray-800 text-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y-2 divide-gray-700">
            <thead className="text-left">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  File Name
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  Created At
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  Priority
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium"></td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {fileList &&
                fileList.map((file: FILE, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-700 cursor-pointer"
                    onClick={() => router.push(`/workspace/${file._id}`)}
                  >
                    <td className="whitespace-nowrap px-4 py-2">
                      {file.fileName}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2">
                      {moment(file._creationTime).format("DD MMM YYYY, h:mm A")}
                    </td>

                    <td
                      className="whitespace-nowrap px-4 py-2"
                      onClick={(event) => event.stopPropagation()} // Prevent row click
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <div
                              className={`h-4 w-4 rounded-full ${priorityFill[file._proirity]}`}
                            ></div>
                            <span
                              className={`text-sm font-medium ${priorityTextColor[file._proirity]}`}
                            >
                              {file._proirity || "Unassigned"}
                            </span>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {["High", "Medium", "Low", "Unassigned"].map((priority) => (
                            <DropdownMenuItem
                              key={priority}
                              onClick={(event) => {
                                event.stopPropagation(); // Prevent row click
                                handlePriorityChange(file._id, priority);
                              }}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <div
                                className={`h-4 w-4 rounded-full ${priorityFill[priority]}`}
                              ></div>
                              <span
                                className={`text-sm font-medium ${priorityTextColor[priority]}`}
                              >
                                {priority}
                              </span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>

                    <td className="whitespace-nowrap px-4 py-2">
                      {user && (
                        <Image
                          src="/img.png"
                          alt="user"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      )}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {/* Open option */}
                          <DropdownMenuItem
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent row click
                              router.push(`/workspace/${file._id}`); // Open the file page
                            }}
                            className="flex items-center gap-3"
                          >
                            <File className="h-4 w-4" /> Open
                          </DropdownMenuItem>

                          {/* Archive option */}
                          <DropdownMenuItem
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent row click
                              handleArchive(file._id); // Call the archive function
                            }}
                            className="flex items-center gap-3"
                          >
                            <Archive className="h-4 w-4" /> Archive
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
