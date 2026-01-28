"use client";

import { bloglogout } from "@/app/actions/auth";
import { useRef, useState } from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import { Color, TextStyle, TextStyleKit } from "@tiptap/extension-text-style";
import { TextSelection } from "prosemirror-state";
import ImageResize from "tiptap-extension-resize-image";

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "mx-auto block",
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          return {
            class: attributes.class,
          };
        },
      },
    };
  },
});

export default function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomImage,
      Dropcursor,
      TextStyle,
      Gapcursor,
      Color,
      TextStyleKit,
      ImageResize.configure({
        inline: true,
      }),
    ],
    content: "<p>Merhaba Dünya! 🌎️</p>",
    immediatelyRender: false,
    onCreate({ editor }) {
      setContent(editor.getHTML());
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    editorProps: {
      handleDrop(view, event, moved) {
        if (moved) return false;

        const file = event.dataTransfer?.files?.[0];
        if (file && file.type.startsWith("image")) {
          const coords = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (!coords) return false;

          const reader = new FileReader();
          reader.onload = () => {
            const src = reader.result as string;
            const node = view.state.schema.nodes.image.create({ src });

            let tr = view.state.tr.insert(coords.pos, node);

            const selection = TextSelection.near(
              tr.doc.resolve(coords.pos + 1)
            );
            tr = tr.setSelection(selection);

            view.dispatch(tr);
            view.focus();
          };
          reader.readAsDataURL(file);
          return true;
        }
        return false;
      },
      handlePaste(view, event) {
        const file = event.clipboardData?.files?.[0];

        if (file && file.type.startsWith("image")) {
          const reader = new FileReader();

          reader.onload = () => {
            const src = reader.result as string;
            const { schema, tr, selection } = view.state;

            const node = schema.nodes.image.create({ src });
            const transaction = tr.insert(selection.from, node);

            const resolvedPos = transaction.doc.resolve(selection.from + 1);
            transaction.setSelection(TextSelection.near(resolvedPos));

            view.dispatch(transaction);
            view.focus();
          };

          reader.readAsDataURL(file);
          return true;
        }

        return false;
      },
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        color: ctx.editor?.getAttributes("textStyle").color,
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor?.isActive("italic") ?? false,
        canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor?.isActive("strike") ?? false,
        canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor?.isActive("code") ?? false,
        canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor?.isActive("paragraph") ?? false,
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor?.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor?.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor?.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      };
    },
  });

  const handleSubmit = () => {
    const input = inputRef.current;
    if (input) input.value = content;
  };

  return (
    <div className="m-5 bg-gray-900 rounded-xl border">
      <h1 className="pt-5">BLOG YÖNETİM PANELİ</h1>
      <form
        method="post"
        action="../../../api/saveBlog"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Blog Başlığı</label> <br />
        <input
          className="input bg-transparent mt-2"
          type="text"
          name="title"
          id="title"
          required
        />
        <input type="hidden" name="content" ref={inputRef} required />
        <div className="p-4">
          <input
            type="color"
            onInput={(event) =>
              editor?.chain().focus().setColor(event.currentTarget.value).run()
            }
            value={editorState?.color || "#000000"}
            data-testid="setColor"
            placeholder="Renk seçin"
            className="rounded-2xl"
          />{" "}
          <br />
          <button type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editorState?.canBold}
            className={
              editorState?.isBold
                ? "is-active btn bg-transparent"
                : "btn bg-transparent"
            }
          >
            Kalın
          </button>
          <button type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editorState?.canItalic}
            className={
              editorState?.isItalic
                ? "is-active btn bg-transparent"
                : "btn bg-transparent"
            }
          >
            İtalik
          </button>
          <button type="button"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            disabled={!editorState?.canStrike}
            className={
              editorState?.isStrike
                ? "is-active btn bg-transparent"
                : "btn bg-transparent"
            }
          >
            Üstü Çizili
          </button>
          <button type="button"
            onClick={() => editor?.chain().focus().toggleCode().run()}
            disabled={!editorState?.canCode}
            className={
              editorState?.isCode
                ? "is-active btn bg-transparent"
                : "btn bg-transparent"
            }
          >
            Kod
          </button>
          <button type="button"
            onClick={() => editor?.chain().focus().unsetAllMarks().run()}
            className="btn bg-transparent"
          >
            Tüm Biçimleri Temizle
          </button>
          <button type="button"
            onClick={() => editor?.chain().focus().clearNodes().run()}
            className="btn bg-transparent"
          >
            Tüm Blokları Temizle
          </button>
          <button type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              (editorState?.isHeading1 ? "is-active" : "") +
              "btn bg-transparent"
            }
          >
            Başlık 1
          </button>
          <button type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              (editorState?.isHeading2 ? "is-active" : "") +
              "btn bg-transparent"
            }
          >
            Başlık 2
          </button>
          <button type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              (editorState?.isHeading3 ? "is-active" : "") +
              "btn bg-transparent"
            }
          >
            Başlık 3
          </button>
          <button type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              (editorState?.isHeading4 ? "is-active" : "") +
              "btn bg-transparent"
            }
          >
            Başlık 4
          </button>
          <button type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              (editorState?.isHeading5 ? "is-active" : "") +
              "btn bg-transparent"
            }
          >
            Başlık 5
          </button>
          <button type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              (editorState?.isHeading6 ? "is-active" : "") +
              "btn bg-transparent"
            }
          >
            Başlık 6
          </button>
          <button type="button"
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={
              (editorState?.isCodeBlock ? "is-active" : "") +
              "btn bg-transparent"
            }
          >
            Kod Bloğu
          </button>
          <button type="button"
            onClick={() => editor?.chain().focus().setHardBreak().run()}
            className="btn bg-transparent"
          >
            Satır Sonu
          </button>
          <button type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editorState?.canUndo}
            className="btn bg-transparent"
          >
            Geri Al
          </button>
          <button type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editorState?.canRedo}
            className="btn bg-transparent"
          >
            Yinele
          </button>
          <EditorContent
            className="border rounded mt-2 text-left"
            editor={editor}
          />
          <h2 className="mt-6 font-bold">HTML Çıktısı:</h2>
          <pre className="p-3 rounded text-sm overflow-x-scroll">{content}</pre>
        </div>
        <button className="btn bg-transparent mb-5" type="submit">
          Kaydet ve Gönder
        </button>
        <br />
      </form>
      <button type="button" className="btn bg-transparent mb-5" onClick={bloglogout}>
        Çıkış Yap
      </button>
    </div>
  );
}