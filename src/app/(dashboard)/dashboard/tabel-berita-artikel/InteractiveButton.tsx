"use client"

import React from "react"

import { toast } from "@/hooks/use-toast"

import { togglePostStatus } from "./action"

interface InteractiveButtonProps {
  id: string
  isCurrentlyPublished: boolean
}

export default function InteractiveButton({
  id,
  isCurrentlyPublished,
}: InteractiveButtonProps) {
  const handleToggle = async () => {
    console.log(id)
    try {
      const newStatus = !isCurrentlyPublished // Toggle status
      const response = await togglePostStatus(id, newStatus)

      if (response.success) {
        toast({
          title: "Berhasil",
          description: `Post berhasil diubah menjadi ${
            response.is_published ? "Terposting" : "Tidak Terposting"
          }`,
        })
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal mengubah status posting.",
        variant: "destructive",
      })
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={`rounded px-4 py-2 text-sm font-medium ${
        isCurrentlyPublished
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-gray-500 text-white hover:bg-gray-600"
      }`}
    >
      {isCurrentlyPublished ? "Terposting" : "Tidak Terposting"}
    </button>
  )
}
