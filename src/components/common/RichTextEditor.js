"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

const RichTextEditor = (props) => {
  return (
    <div className="text-black mb-4">
      <label className="block text-white text-sm font-bold mb-2">
        {props.title}
        <sup className="text-red-500 text-lg">{props?.required && "*"}</sup>
      </label>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={props.initialData}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.onChange(data);
        }}
      />
      {props?.error && <p className="text-red-500 text-sm my-2 italic">{props?.error}</p>}
    </div>
  );
};

export default RichTextEditor;
