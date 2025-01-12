"use server"

import { revalidatePath } from "next/cache"

import { IBlog } from "@/types/blog"
import db from "@/lib/db" // Assuming db.ts is located in utils directory
import { BlogFormSchemaType } from "@/app/(dashboard)/dashboard/berita-artikel/schema"

const DASHBOARD = "/dashboard/berita-artikel"

export async function createBlog(data: BlogFormSchemaType) {
  try {
    const blog = await db.blog.create({
      data: {
        title: data.title,
        image_url: data.image_url,
        is_premium: data.is_premium,
        is_published: data.is_published,
        blog_content: {
          create: { content: data.content },
        },
      },
      select: { id: true },
    })

    revalidatePath(DASHBOARD)
    return JSON.stringify({ success: true, id: blog.id })
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: (error as Error).message || "An unexpected error occurred",
    })
  }
}

export async function readBlog(): Promise<
  {
    id: string
    createdAt: Date
    title: string
    image_url: string
    is_premium: boolean
    is_published: boolean
    blog_content: { content: string; createdAt: Date; blog_id: string }[]
  }[]
> {
  try {
    return (
      (await db.blog.findMany({
        where: { is_published: true },
        orderBy: { createdAt: "asc" },
        include: { blog_content: true },
      })) || []
    )
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return []
  }
}

export async function readBlogAdmin() {
  try {
    return await db.blog.findMany({
      orderBy: { createdAt: "asc" },
      include: { blog_content: true },
    })
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: (error as Error).message || "An unexpected error occurred",
    })
  }
}

export async function readBlogById(blogId: string) {
  try {
    return await db.blog.findUnique({
      where: { id: blogId },
      include: { blog_content: true },
    })
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: (error as Error).message || "An unexpected error occurred",
    })
  }
}

export async function readBlogIds() {
  try {
    return await db.blog.findMany({
      select: { id: true },
    })
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: (error as Error).message || "An unexpected error occurred",
    })
  }
}

export async function readBlogDeatailById(blogId: string): Promise<{
  id: string
  createdAt: Date
  title: string
  image_url: string
  is_premium: boolean
  is_published: boolean
  blog_content: { createdAt: Date; blog_id: string; content: string }[]
} | null> {
  try {
    const blog = await db.blog.findUnique({
      where: { id: blogId },
      include: { blog_content: true },
    })

    // If no blog is found, return null
    if (!blog) return null

    return blog
  } catch (error) {
    console.error("Error reading blog details:", error)
    return null
  }
}

export async function readBlogContent(blogId: string) {
  try {
    const content = await db.blog_content.findUnique({
      where: { blog_id: blogId },
      select: { content: true },
    })
    return content
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: (error as Error).message || "An unexpected error occurred",
    })
  }
}

export async function updateBlogById(blogId: string, data: IBlog) {
  try {
    const result = await db.blog.update({
      where: { id: blogId },
      data,
    })

    revalidatePath(DASHBOARD)
    revalidatePath("/blog/" + blogId)
    return JSON.stringify({ success: true, result })
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: (error as Error).message || "An unexpected error occurred",
    })
  }
}

export async function updateBlogDetail(
  blogId: string,
  data: BlogFormSchemaType
) {
  try {
    const updatedBlog = await db.blog.update({
      where: { id: blogId },
      data: {
        title: data.title,
        image_url: data.image_url,
        is_premium: data.is_premium,
        is_published: data.is_published,
      },
    })

    await db.blog_content.update({
      where: { blog_id: blogId },
      data: { content: data.content },
    })

    revalidatePath(DASHBOARD)
    revalidatePath("/blog/" + blogId)
    return JSON.stringify({ success: true, updatedBlog })
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: (error as Error).message || "An unexpected error occurred",
    })
  }
}

export async function deleteBlogById(blogId: string) {
  try {
    const result = await db.blog.delete({
      where: { id: blogId },
    })

    revalidatePath(DASHBOARD)
    revalidatePath("/blog/" + blogId)
    return JSON.stringify({ success: true, result })
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: (error as Error).message || "An unexpected error occurred",
    })
  }
}
