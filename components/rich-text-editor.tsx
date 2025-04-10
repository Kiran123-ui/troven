'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditorWrapper({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[300px] w-full border border-gray-200 rounded-md animate-pulse bg-gray-50" />
    )
  }
  
  return <RichTextEditor value={value} onChange={onChange} placeholder={placeholder} />
}

function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '<p></p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[250px] p-4',
        placeholder: placeholder || 'Write something...',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Add a floating menu for formatting options
  return (
    <div className="rich-text-editor">
      {editor && (
        <div className="menu border-b border-gray-200 p-2 flex gap-2 flex-wrap">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded ${editor.isActive('bold') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Bold"
          >
            <span className="font-bold">B</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded ${editor.isActive('italic') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Italic"
          >
            <span className="italic">I</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Heading 2"
          >
            <span className="font-semibold">H2</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Heading 3"
          >
            <span className="font-semibold">H3</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Bullet List"
          >
            • List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Numbered List"
          >
            1. List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1 rounded ${editor.isActive('blockquote') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            title="Quote"
          >
            "Quote"
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}
