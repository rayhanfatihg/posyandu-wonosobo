import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Posyandu Marga Agung",
  author: "Team KSI Marga Agung",
  description:
    "Posyandu Marga Agung adalah website yang digunakan untuk mencatat data posyandu di Desa Marga Agung",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "",
  },
  links: {
    github: "",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
