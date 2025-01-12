import * as z from "zod"

export const BlogFormSchema = z
  .object({
    title: z.string().min(10, {
      message: "Judul terlalu pendek",
    }),
    content: z.string().min(50, {
      message: "Konten terlalu pendek",
    }),
    image_url: z.string().url({
      message: "URL tidak valid",
    }),
    is_premium: z.boolean(),
    is_published: z.boolean(),
  })
  .refine(
    (data) => {
      const image_url = data.image_url
      try {
        const url = new URL(image_url)
        return url.hostname === "images.unsplash.com"
      } catch {
        return false
      }
    },
    {
      message: "Saat ini kami hanya mendukung gambar dari Unsplash",
      path: ["image_url"],
    }
  )

export type BlogFormSchemaType = z.infer<typeof BlogFormSchema>
