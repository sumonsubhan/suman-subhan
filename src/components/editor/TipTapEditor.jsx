"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHighlighter,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaUndo,
  FaRedo,
  FaLink,
  FaImage,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";

import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Placeholder.configure({
        placeholder: "Write your book...",
      }),

      Underline,

      Highlight,

      Link.configure({
        openOnClick: false,
      }),

      Image.configure({
        inline: false,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value,

    editorProps: {
      attributes: {
        class: "min-h-[400px] border rounded-lg p-4 focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-3">
      {/* Toolbar */}

      <div className="flex flex-wrap gap-2 border rounded-lg p-2 bg-gray-50">
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <FaUndo />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <FaRedo />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FaBold />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FaUnderline />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <FaHighlighter />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <LuHeading1 />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <LuHeading2 />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <LuHeading3 />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FaListUl />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <FaQuoteRight />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <FaAlignLeft />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <FaAlignCenter />
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <FaAlignRight />
        </button>
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => editor.chain().focus().setLink({ href: url }).run()}
        >
          <FaLink />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
