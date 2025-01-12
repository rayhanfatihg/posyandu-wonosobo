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

import { getLayananIbuHamilData } from "./action"

type LayananIbuHamil = {
  id: string
  wargaId: string
  hariPertamaHaid: string
  tanggalPerkiraanLahir: string
  umurKehamilan: number
  periksaKehamilan: string
  statusGiziKEK: boolean
  statusGiziRisti: boolean
  statusPeriksaLengkap: boolean
  minumTtd: boolean
  kpPascaBersalin: boolean
  tambahanGizi: boolean
  createdAt: string
}

const columns: ColumnDef<LayananIbuHamil>[] = [
  {
    accessorKey: "warga.nama",
    header: "Nama",
    cell: (info) => info.getValue() || "Tidak Tersedia",
  },
  {
    accessorKey: "hariPertamaHaid",
    header: "Hari Pertama Haid",
    cell: (info) =>
      new Date(info.getValue<string>()).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "tanggalPerkiraanLahir",
    header: "Tanggal Perkiraan Lahir",
    cell: (info) =>
      new Date(info.getValue<string>()).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "umurKehamilan",
    header: "Umur Kehamilan (minggu)",
  },
  {
    accessorKey: "periksaKehamilan",
    header: "Status Periksa Kehamilan",
  },
  {
    accessorKey: "statusGiziKEK",
    header: "Status Gizi KEK",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "statusGiziRisti",
    header: "Status Gizi Risti",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "statusPeriksaLengkap",
    header: "Status Periksa Lengkap",
    cell: (info) => (info.getValue() ? "Lengkap" : "Tidak Lengkap"),
  },
  {
    accessorKey: "minumTtd",
    header: "Minum TTD",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "kpPascaBersalin",
    header: "Layanan Pasca Bersalin",
    cell: (info) => (info.getValue() ? "Ya" : "Tidak"),
  },
  {
    accessorKey: "tambahanGizi",
    header: "Tambahan Gizi",
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

export default function TabelDataBumil({ year, month }: FilterProps) {
  const [data, setData] = useState<LayananIbuHamil[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const layananData = await getLayananIbuHamilData(year, month)
      setData(
        layananData.map((item) => ({
          ...item,
          hariPertamaHaid: item.hariPertamaHaid.toISOString(),
          tanggalPerkiraanLahir: item.tanggalPerkiraanLahir.toISOString(),
          createdAt: item.createdAt.toISOString(),
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
