"use client"

import { ReactNode, useState, useTransition } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeOpenIcon, Pencil1Icon, RocketIcon } from "@radix-ui/react-icons"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { IBlogDetial, IBlogForm } from "@/types/blog"
import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import MarkdownPreview from "./component/MarkdownPreview"
import { BlogFormSchema, BlogFormSchemaType } from "./schema"

export default function BlogForm({
  onHandleSubmit,
  defaultBlog,
}: {
  defaultBlog: IBlogDetial
  onHandleSubmit: (data: BlogFormSchemaType) => void
}) {
  const [isPending, startTransition] = useTransition()
  const [isPreview, setPreivew] = useState(false)

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: defaultBlog?.title,
      content: defaultBlog?.blog_content.content,
      image_url: defaultBlog?.image_url,
      is_premium: defaultBlog?.is_premium,
      is_published: defaultBlog?.is_published,
    },
  })

  const onSubmit = (data: z.infer<typeof BlogFormSchema>) => {
    startTransition(() => {
      onHandleSubmit(data)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col rounded-md border pb-5"
      >
        <div className="flex flex-wrap items-center gap-2 border-b p-5 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            <span
              onClick={() => {
                setPreivew(
                  !isPreview && !form.getFieldState("image_url").invalid
                )
              }}
              role="button"
              tabIndex={0}
              className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all hover:border-zinc-400"
            >
              {!isPreview ? (
                <>
                  <EyeOpenIcon />
                  Lihat Preview
                </>
              ) : (
                <>
                  <Pencil1Icon />
                  Edit
                </>
              )}
            </span>

            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 rounded-md border px-2 py-1.5">
                      <RocketIcon />

                      <span className="text-sm">Posting</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            role="button"
            className={cn(
              "group flex items-center gap-2 rounded-md border px-2 py-1.5 text-sm transition-all disabled:opacity-50"
            )}
            disabled={!form.formState.isValid}
          >
            <Save className="group-disabled:animate-none" />
            Simpan
          </button>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div
                    className={cn(
                      "flex w-full gap-2 break-words p-2",
                      isPreview ? "divide-x-0" : "divide-x"
                    )}
                  >
                    <Input
                      placeholder="Judul Blog"
                      {...field}
                      autoFocus
                      className={cn(
                        "text-lg font-medium leading-relaxed focus:ring-1",
                        isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                      )}
                    />

                    <div
                      className={cn(
                        "lg:px-10",
                        isPreview
                          ? "mx-auto w-full md:mx-0"
                          : "hidden w-1/2 lg:block"
                      )}
                    >
                      <h1 className="text-center text-3xl font-bold dark:text-gray-200">
                        {form.getValues().title || "Untitled blog"}
                      </h1>
                    </div>
                  </div>
                </>
              </FormControl>

              {form.getFieldState("title").invalid &&
                form.getValues().title && (
                  <div className="px-2">
                    <FormMessage />
                  </div>
                )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      "flex w-full items-center gap-2 divide-x p-2",
                      isPreview ? "divide-x-0" : "divide-x"
                    )}
                  >
                    <Input
                      placeholder="Link Gambar"
                      {...field}
                      className={cn(
                        "text-lg font-medium leading-relaxed focus:ring-1",
                        isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                      )}
                      type="url"
                    />

                    <div
                      className={cn(
                        "relative",
                        isPreview
                          ? "mx-auto w-full px-0 lg:w-4/5"
                          : "hidden w-1/2 px-10 lg:block"
                      )}
                    >
                      {isPreview ? (
                        <div className="relative mt-10 h-80 w-full rounded-md border">
                          <Image
                            src={form.getValues().image_url}
                            alt="preview"
                            fill
                            className="rounded-md object-cover object-center"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-400">
                          Klik menu preview untuk melihat gambar
                        </p>
                      )}
                    </div>
                  </div>
                </FormControl>

                <div className="px-3">
                  <FormMessage />
                </div>
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "flex w-full gap-2 p-2",
                    !isPreview ? "h-70vh divide-x" : "divide-x-0"
                  )}
                >
                  <Textarea
                    placeholder="Isi Blog"
                    {...field}
                    className={cn(
                      "min-h-70vh resize-none border text-lg font-medium leading-relaxed text-black focus:ring-1",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />

                  <div
                    className={cn(
                      "h-full overflow-scroll",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "hidden w-1/2 lg:block"
                    )}
                  >
                    <MarkdownPreview
                      content={form.getValues().content}
                      className="lg:px-10"
                    />
                  </div>
                </div>
              </FormControl>

              <div className="px-3">
                {form.getFieldState("content").invalid &&
                  form.getValues().content && <FormMessage />}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

const ImageEror = ({ src }: { src: string }) => {
  try {
    return <Image src={src} alt="" width={100} height={100} />
  } catch {
    return <h1>Invalid</h1>
  }
}
