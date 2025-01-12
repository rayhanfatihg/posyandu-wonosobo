"use client"

import React, { useEffect, useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getLayananCalonPengantinData } from "./action" // Update the path accordingly

type LayananCalonPengantin = {
  id: string
  tanggalPernikahan: string
  periksaKesehatan: boolean
  bimbinganPerkawinan: boolean
  createdAt: string
}

const columns: ColumnDef<LayananCalonPengantin>[] = [
  {
    accessorKey: "warga.nama",
    header: "Nama",
    cell: (info) => info.getValue() || "Tidak Tersedia",
  },
  {
    accessorKey: "tanggalPernikahan",
    header: "Tanggal Pernikahan",
    cell: (info) =>
      new Date(info.getValue<string>()).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "periksaKesehatan",
    header: "Periksa Kesehatan",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "bimbinganPerkawinan",
    header: "Bimbingan Perkawinan",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Pencatatan",
    cell: (info) =>
      new Date(info.getValue<string>()).toLocaleDateString("id-ID"),
  },
]

type FilterProps = {
  year?: number
  month?: string
}

export default function TabelDataCatin({ year, month }: FilterProps) {
  const [data, setData] = useState<LayananCalonPengantin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const layananData = await getLayananCalonPengantinData(year, month)
      console.log("Layanan Calon Pengantin Data:", layananData)
      setData(
        layananData.map((item) => ({
          ...item,
          tanggalPernikahan: item.tanggalPernikahan,
          createdAt: item.createdAt,
        }))
      )
      setLoading(false)
    }
    fetchData()
  }, [year, month])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading data...</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="p-4">
        <p>No data available for the selected filters.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <ScrollArea className="max-w-[320px] overflow-hidden rounded-md border sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1280px]">
        <Table className="min-w-full overflow-hidden divide-y divide-gray-200 rounded-md">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="bg-white">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
