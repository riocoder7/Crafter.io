"use client";

import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Warning from "@editorjs/warning";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import Embed from "@editorjs/embed";
// @ts-ignore
import Code from "@editorjs/code";
// @ts-ignore 
import LinkTool from "@editorjs/link";
// @ts-ignore
import Table from "@editorjs/table";
// @ts-ignore
import Delimiter from "@editorjs/delimiter";
// @ts-ignore
import Marker from "@editorjs/marker";
// @ts-ignore
import InlineCode from "@editorjs/inline-code";
import { act_result } from "./Result";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      type: "header",
      data: { text: act_result, level: 2 },
      id: "initial-header",
    },
    {
      type: "paragraph",
      data: { text: act_result},
      id: "initial-paragraph",
    },
  ],
  version: "2.8.1",
};
let data=act_result;
console.log(data)
function Editor({ act_result }: { act_result: string }) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
        checklist: Checklist,
        paragraph: Paragraph,
        warning: Warning,
        quote: Quote,
        embed: Embed,
        code: Code,
        linkTool: LinkTool,
        table: Table,
        delimiter: Delimiter,
        marker: Marker,
        inlineCode: InlineCode,
      },
      data: rawDocument,
    });

    editorRef.current = editor;

    editor.isReady
      .then(() => console.log("EditorJS is ready!"))
      .catch((error) => console.error("EditorJS initialization failed:", error));

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  const addContent = () => {
    if (editorRef.current) {
      editorRef.current.isReady
        .then(() => {
          editorRef.current?.blocks.insertMany([
            { type: "paragraph", data: { text: "Ssdsdd" } },
            { type: "paragraph", data: { text: act_result } }, // Add another paragraph with act_result
          ]);
          console.log("Inserted multiple blocks.");
        })
        .catch((error) =>
          console.error("Error inserting blocks into EditorJS:", error)
        );
    }
  };
  

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#181818",
        padding: "20px",
        color: "#e2e2e2",
      }}
    >
      <button
        onClick={addContent}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add Content
      </button>
      <div
        id="editorjs"
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#2a2a2a",
          borderRadius: "8px",
          border: "1px solid #444",
          overflowY: "auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      ></div>
    </div>
  );
}

export default Editor;
