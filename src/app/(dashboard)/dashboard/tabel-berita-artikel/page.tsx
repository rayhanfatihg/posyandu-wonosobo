import React from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getTablePost } from "./action"
import InteractiveButton from "./InteractiveButton" // Import Client Component

export default async function BlogTablePage() {
  const data = await getTablePost() // Ambil data dari Server Action

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Atur Postingan Blog & Artikel</h1>
      {data.length > 0 ? (
        <div className="rounded-md border">
          <ScrollArea className="max-w-full overflow-hidden rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Gambar Utama</TableHead>
                  <TableHead>Dibuat pada</TableHead>
                  <TableHead>Status Posting</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <a
                        href={item.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Image
                      </a>
                    </TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      <InteractiveButton
                        id={item.id}
                        isCurrentlyPublished={item.is_published}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada data tersedia.</p>
      )}
    </div>
  )
}
