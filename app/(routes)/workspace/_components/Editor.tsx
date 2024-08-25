"use client";
import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import Warning from '@editorjs/warning';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Code from '@editorjs/code';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';

const rawDocument = {
  "time": 1550476186479,
  "blocks": [
    {
      data: {
        text: '',
        level: 1 // Default level for header
      },
      id: "1234",
      type: 'header'
    },
    {
      data: {
        text: '',
        level: 3
      },
      id: "1236",
      type: 'paragraph'
    },
  ],
  "version": "2.8.1"
};

function Editor({ onSaveTrigger, fileId, fileData }: { onSaveTrigger: any, fileId: any, fileData: FILE }) {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

  useEffect(() => {
    onSaveTrigger && onSaveDocument();
  }, [onSaveTrigger]);

  const initEditor = () => {
    const editor = new EditorJS({
      tools: {
        header: {
          //@ts-ignore
          class: Header,
          shortcut: 'CMD+SHIFT+H',
          inlineToolbar: true,
          config: {
            placeholder: 'Enter a Header', // Placeholder text for headers
            levels: [1, 2, 3, 4, 5, 6], // Available header levels
          }
        },
        list: {
          //@ts-ignore
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: 'One word leads to paragraph, paragraph leads to sentence and sentences lead to pages'
          }
        },  
        warning: Warning,
        quote: Quote,
        embed: Embed,
        code: Code,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:3000', // Your backend endpoint for URL data fetching
          }
        },
        table: Table,
        delimiter: Delimiter,
        marker: Marker,
        inlineCode: InlineCode,
      },
      holder: 'editorjs',
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument
    });
    ref.current = editor;
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        updateDocument({
          _id: fileId,
          document: JSON.stringify(outputData)
        }).then(() => {
          toast('Document Updated!');
        }, () => {
          toast("Server Error!");
        });
      }).catch((error) => {
        console.log('Saving failed: ', error);
      });
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      padding: '20px',
      backgroundColor: '#1a202c', /* Dark background for the container */
    }}>
      <div 
        id="editorjs" 
        style={{ 
          flex: 1, /* Takes up remaining space */
          padding: '20px',
          backgroundColor: '#2d3748', /* Darker background for editor */
          color: '#cbd5e0', /* Light text color */
          borderRadius: '4px',
          border: '1px solid #2d3748',
          overflowY: 'auto',
        }} 
      ></div>
    </div>
  );
}

export default Editor;
