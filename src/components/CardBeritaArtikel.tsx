import React from "react"
import Image from "next/image"

import { Card, CardContent } from "./ui/card"

interface CardBeritaArtikelPropsType {
  img: string
  title: string
  desc: string
}

export default function CardBeritaArtikel({
  title,
  desc,
  img,
}: CardBeritaArtikelPropsType) {
  return (
    <Card
      className="relative grid min-h-[24rem] w-[20rem] items-end overflow-hidden rounded-xl border-none shadow-sm md:min-h-[20rem] md:w-[26rem]"
      color="transparent"
    >
      <Image
        src={img}
        alt="bg"
        className="absolute inset-0 h-full w-full object-cover object-center"
        layout="fill"
      />

      <div className="absolute inset-0 bg-black/70" />

      <CardContent className="relative flex flex-col justify-end text-white">
        <h3 className="text-xl font-bold">{title}</h3>

        <div className="my-2 max-w-sm font-light text-white/80">{desc}</div>
      </CardContent>
    </Card>
  )
}
