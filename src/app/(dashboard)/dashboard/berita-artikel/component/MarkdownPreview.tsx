import React from "react"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm" // Tambahkan plugin ini untuk dukungan tabel

import CopyButton from "./CopyButton"

import "highlight.js/styles/atom-one-dark.min.css"

import { Terminal } from "lucide-react"

import { cn } from "@/lib/utils"

// Komponen untuk menampilkan pratinjau Markdown dengan dukungan lebih lengkap
export default function MarkdownPreview({
  content,
  className = "sm:p-10",
}: {
  content: string
  className?: string
}) {
  return (
    <Markdown
      className={cn("space-y-8 dark:text-gray-200", className)}
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkGfm]} // Tambahkan plugin GFM
      components={{
        // Styling untuk H1
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="mb-4 mt-6 text-3xl font-bold" />
        },
        // Styling untuk H2
        h2: ({ node, ...props }) => {
          return <h2 {...props} className="mb-2 mt-4 text-2xl font-semibold" />
        },
        // Styling untuk H3
        h3: ({ node, ...props }) => {
          return <h3 {...props} className="mb-2 mt-4 text-xl font-medium" />
        },
        // Styling untuk paragraf
        p: ({ node, ...props }) => {
          return <p {...props} className="mb-4 mt-4 text-lg leading-relaxed" />
        },
        // Styling untuk daftar tidak terurut
        ul: ({ node, ...props }) => {
          return <ul {...props} className="mb-4 mt-4 list-disc pl-6" />
        },
        // Styling untuk item daftar tidak terurut
        li: ({ node, ...props }) => {
          return <li {...props} className="text-lg" />
        },
        // Styling untuk gambar
        img: ({ node, ...props }) => {
          return (
            <div className="my-6">
              <img
                {...props}
                className="h-auto max-w-full rounded-lg shadow-lg"
                alt={props.alt || "Image"}
              />
            </div>
          )
        },
        // Styling untuk blockquote
        blockquote: ({ node, ...props }) => {
          return (
            <blockquote
              {...props}
              className="mb-4 mt-4 border-l-4 pl-4 text-lg italic text-gray-600"
            />
          )
        },
        // Styling untuk tabel
        table: ({ node, ...props }) => {
          return (
            <div className="overflow-x-auto">
              <table
                {...props}
                className="mb-4 mt-4 w-full table-auto border-collapse"
              >
                {props.children}
              </table>
            </div>
          )
        },
        // Styling untuk baris tabel
        tr: ({ node, ...props }) => {
          return <tr {...props} className="border-b" />
        },
        // Styling untuk sel tabel
        td: ({ node, ...props }) => {
          return <td {...props} className="border px-4 py-2" />
        },
        th: ({ node, ...props }) => {
          return (
            <th {...props} className="border px-4 py-2 text-left font-bold" />
          )
        },
        // Styling untuk kode dalam teks
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          const id = (Math.floor(Math.random() * 100) + 1).toString()
          if (match?.length) {
            let Icon = <Terminal />

            return (
              <div className="rounded-md border-[0.5px] border-zinc-500 bg-gradient-to-r from-zinc-800 to-zinc-700 text-gray-300">
                <div className="flex items-center justify-between border-b-[0.5px] border-zinc-500 px-5 py-2">
                  <div className="flex items-center gap-2">
                    <Terminal />
                    <p className="text-sm text-gray-400">
                      {/* @ts-ignore */}
                      {node?.data?.meta}
                    </p>
                  </div>
                  <CopyButton id={id} />
                </div>

                <div className="w-full overflow-x-auto">
                  <div className="p-5" id={id}>
                    {children}
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <code
                className="break-words rounded-sm bg-zinc-700 px-1 text-lg"
                {...props}
              >
                {children}
              </code>
            )
          }
        },
        // Styling untuk bagian horizontal rule (garis horizontal)
        hr: ({ node, ...props }) => {
          return <hr className="my-6 border-t-2 border-gray-300" />
        },
      }}
    >
      {content}
    </Markdown>
  )
}
