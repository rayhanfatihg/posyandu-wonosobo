// src/app/(dashboard)/dashboard/tabel-data/components/tabel-data-lansia/TabelDataLansia.tsx
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

import { getLayananLansiaData, LayananLansia } from "./action"

type TabelDataLansiaProps = {
  year?: number
  month?: string
}

export default function TabelDataLansia({ year, month }: TabelDataLansiaProps) {
  const [data, setData] = useState<LayananLansia[]>([])
  const [loading, setLoading] = useState(true)

  // Define table columns, including the new "Nama" column
  const columns: ColumnDef<LayananLansia>[] = [
    {
      accessorKey: "warga.nama", // Access `nama` from `warga` relation
      header: "Nama",
      cell: (info) => info.getValue() || "Tidak Tersedia",
    },
    { accessorKey: "gds", header: "GDS" },
    { accessorKey: "beratBadan", header: "Berat Badan (kg)" },
    { accessorKey: "tinggiBadan", header: "Tinggi Badan (cm)" },
    { accessorKey: "lingkarPinggang", header: "Lingkar Pinggang (cm)" },
    { accessorKey: "tekananDarah", header: "Tekanan Darah" },
    {
      accessorKey: "createdAt",
      header: "Tanggal Pencatatan",
      cell: (info) =>
        new Date(info.getValue<string>()).toLocaleDateString("id-ID"),
    },
  ]

  useEffect(() => {
    // Fetch data with filtering based on `year` and `month`
    const fetchData = async () => {
      setLoading(true)
      try {
        const layananData = await getLayananLansiaData(year, month)
        setData(layananData)
      } catch (error) {
        console.error("Failed to load Layanan Lansia data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [year, month])

  // Initialize table instance
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
