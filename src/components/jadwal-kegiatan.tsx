import React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getJadwalPosyanduThisMonth } from "./action"

export default async function JadwalKegiatanBulanIni() {
  const jadwal = await getJadwalPosyanduThisMonth()

  // Helper function to format date
  const formatTanggal = (tanggal: string | Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(tanggal))
  }

  return (
    <div className="p-4">
      {jadwal.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Acara</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jam</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jadwal.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.namaAcara}</TableCell>
                  <TableCell>{formatTanggal(item.tanggal)}</TableCell>
                  <TableCell>{item.jam}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada kegiatan pada bulan ini.</p>
      )}
    </div>
  )
}
