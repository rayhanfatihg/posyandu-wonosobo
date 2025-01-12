"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

import { useToast } from "@/hooks/use-toast"

import { createBlog } from "./action"
import BlogForm from "./BlogForm"
import { defaultCreateBlog } from "./data"
import { BlogFormSchemaType } from "./schema"

export default function CreateForm() {
  const { toast } = useToast()
  const router = useRouter()

  const onHandleSubmit = async (data: BlogFormSchemaType) => {
    const result = JSON.parse(await createBlog(data))

    const { error } = result as PostgrestSingleResponse<null>
    if (error?.message) {
      toast({
        title: "Gagal membuat postingan blog",
        description: (
          <pre className="mt-2 w-[340px] rounded-md p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      })
    } else {
      toast({
        title: "Suskses membuat postingan blog",
        description: data.title,
      })
      router.push("/dashboard/tabel-berita-artikel")
    }
  }

  return (
    <div className="min-w-[300px] sm:min-w-[580px] md:min-w-[680px] lg:min-w-[900px] xl:min-w-[1200px]">
      <h1 className="text-2xl font-bold">Tambah Postingan Blog & Artikel</h1>

      <div className="mt-10">
        <BlogForm
          onHandleSubmit={onHandleSubmit}
          defaultBlog={defaultCreateBlog}
        />
      </div>
    </div>
  )
}
