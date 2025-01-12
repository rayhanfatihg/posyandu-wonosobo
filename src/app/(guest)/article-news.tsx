import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function ArticleNews() {
  return (
    <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
      {/* <Icons.logo className="w-16 h-16" /> */}
      <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
        Berita & Artikel
      </h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        {siteConfig.description}
      </p>
      <div className="flex gap-2">
        <Link
          href={siteConfig.links.github}
          target="_blank"
          className={cn(buttonVariants({ size: "default" }))}
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
