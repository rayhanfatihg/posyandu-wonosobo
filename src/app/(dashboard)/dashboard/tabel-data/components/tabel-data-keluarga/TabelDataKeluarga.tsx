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

import { getLayananKeluargaData } from "./action" // Pastikan path ini benar

// Define types for LayananKeluarga based on your Prisma schema
type LayananKeluarga = {
  id: string
  namaKepalaKeluarga: string
  dusun: string
  anak_0_59_bulan: number
  kategoriKeluargaRentan: boolean
  kartuKeluarga: boolean
  jambanSehat: boolean
  sumberAirBersih: boolean
  jaminanSosial: boolean
  jaminanKesehatan: boolean
  aksesSanitasi: boolean
  pendampinganKeluarga: boolean
  ketahananPangan: boolean
  createdAt: string
}

// Define columns based on the LayananKeluarga model fields
const columns: ColumnDef<LayananKeluarga>[] = [
  {
    accessorKey: "namaKepalaKeluarga",
    header: "Nama Kepala Keluarga",
    cell: (info) => info.getValue() || "Tidak Tersedia",
  },
  {
    accessorKey: "dusun",
    header: "Dusun",
    cell: (info) => info.getValue() || "Tidak Tersedia",
  },
  {
    accessorKey: "anak_0_59_bulan",
    header: "Anak Usia 0-59 Bulan",
    cell: (info) => info.getValue() || "Tidak Tersedia",
  },
  {
    accessorKey: "kategoriKeluargaRentan",
    header: "Kategori Keluarga Rentan",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "kartuKeluarga",
    header: "Kartu Keluarga",
    cell: (info) => (info.getValue() ? "Ada" : "Tidak Ada"),
  },
  {
    accessorKey: "jambanSehat",
    header: "Jamban Sehat",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "sumberAirBersih",
    header: "Sumber Air Bersih",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "jaminanSosial",
    header: "Jaminan Sosial",
    cell: (info) => (info.getValue() ? "Ada" : "Tidak Ada"),
  },
  {
    accessorKey: "jaminanKesehatan",
    header: "Jaminan Kesehatan",
    cell: (info) => (info.getValue() ? "Ada" : "Tidak Ada"),
  },
  {
    accessorKey: "aksesSanitasi",
    header: "Akses Sanitasi",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "pendampinganKeluarga",
    header: "Pendampingan Keluarga",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "ketahananPangan",
    header: "Ketahanan Pangan",
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

export default function TabelDataLayananKeluarga({ year, month }: FilterProps) {
  const [data, setData] = useState<LayananKeluarga[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const layananData = await getLayananKeluargaData(year, month)
      console.log("Layanan Keluarga Data:", layananData) // Cek data yang diterima
      setData(
        layananData.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt).toISOString(),
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
        <Table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-md">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
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
