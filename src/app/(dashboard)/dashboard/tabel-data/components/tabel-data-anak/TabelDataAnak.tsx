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

import { getLayananAnakData } from "./action" // Sesuaikan path jika berbeda

// Define types for LayananAnak based on your Prisma schema
type LayananAnak = {
  id: string
  namaOrangTua: string
  jenisKelamin: "LAKI_LAKI" | "PEREMPUAN"
  statusGiziKurang: boolean
  statusGiziBuruk: boolean
  stunting: boolean
  imunisasiHbO: boolean
  imunisasiBcgPolio1: boolean
  statusKelengkapan: boolean
  createdAt: string // Assuming ISO string format
}

// Define columns based on the LayananAnak model fields
const columns: ColumnDef<LayananAnak>[] = [
  {
    accessorKey: "warga.nama", // Access `nama` from `warga` relation
    header: "Nama",
    cell: (info) => info.getValue() || "Tidak Tersedia",
  },
  {
    accessorKey: "namaOrangTua",
    header: "Nama Orang Tua",
  },
  {
    accessorKey: "jenisKelamin",
    header: "Jenis Kelamin",
    cell: (info) =>
      info.getValue() === "LAKI_LAKI" ? "Laki-Laki" : "Perempuan",
  },
  {
    accessorKey: "statusGiziKurang",
    header: "Status Gizi Kurang",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "statusGiziBuruk",
    header: "Status Gizi Buruk",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "stunting",
    header: "Stunting",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "imunisasiHbO",
    header: "Imunisasi HbO",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "imunisasiBcgPolio1",
    header: "Imunisasi BCG/Polio 1",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "statusKelengkapan",
    header: "Status Kelengkapan",
    cell: (info) => (info.getValue() ? "Lengkap" : "Tidak Lengkap"),
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

export default function TabelDataAnak({ year, month }: FilterProps) {
  const [data, setData] = useState<LayananAnak[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const layananData = await getLayananAnakData(year, month)
      console.log("Layanan Anak Data:", layananData) // Cek data yang diterima
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
