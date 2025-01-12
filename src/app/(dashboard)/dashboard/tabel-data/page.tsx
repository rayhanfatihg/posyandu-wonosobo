// src/app/(dashboard)/dashboard/tabel-data/page.tsx
"use client"

import React, { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import TabelDataAnak from "./components/tabel-data-anak/TabelDataAnak"
import TabelDataBumil from "./components/tabel-data-bumil/TabelDataBumil"
import TabelDataCatin from "./components/tabel-data-catin/TabelDataCatin"
import TabelDataKeluarga from "./components/tabel-data-keluarga/TabelDataKeluarga"
import TabelDataLansia from "./components/tabel-data-lansia/TabelDataLansia"
import TabelDataRematri from "./components/tabel-data-rematri/TabelDataRematri"

const monthsByYear: { [key: number]: string[] } = {
  2023: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
  2024: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-3/4 rounded bg-gray-300"></div>
      <div className="h-4 w-5/6 rounded bg-gray-300"></div>
      <div className="h-4 w-1/2 rounded bg-gray-300"></div>
    </div>
  )
}

export default function TableDataPage() {
  const [selectedLayanan, setSelectedLayanan] = useState("keluarga")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedLayanan = localStorage.getItem("selectedLayanan")
    if (storedLayanan) {
      setSelectedLayanan(storedLayanan)
    }
    setLoading(false)
  }, [])

  const handleLayananChange = (value: string) => {
    setLoading(true)
    setSelectedLayanan(value)
    localStorage.setItem("selectedLayanan", value)
    setTimeout(() => setLoading(false), 300)
  }

  const handleYearChange = (year: string) => {
    setSelectedYear(parseInt(year, 10))
    localStorage.setItem("tahun", year)
    setSelectedMonth(null)
  }

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
    localStorage.setItem("bulan", month)
  }

  const renderSelectedTable = () => {
    switch (selectedLayanan) {
      case "keluarga":
        return (
          <TabelDataKeluarga
            year={selectedYear ?? undefined}
            month={selectedMonth ?? undefined}
          />
        )
      case "remaja_putri":
        return (
          <TabelDataRematri
            year={selectedYear ?? undefined}
            month={selectedMonth ?? undefined}
          />
        )
      case "ibu_hamil":
        return (
          <TabelDataBumil
            year={selectedYear ?? undefined}
            month={selectedMonth ?? undefined}
          />
        )
      case "calon_pengantin":
        return (
          <TabelDataCatin
            year={selectedYear ?? undefined}
            month={selectedMonth ?? undefined}
          />
        )
      case "anak":
        return (
          <TabelDataAnak
            year={selectedYear ?? undefined}
            month={selectedMonth ?? undefined}
          />
        )
      case "lansia":
        return (
          <TabelDataLansia
            year={selectedYear ?? undefined}
            month={selectedMonth ?? undefined}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen w-full">
      <div className="mb-4">
        <label className="mb-1 block text-sm font-semibold">
          Tampilkan Data Tabel
        </label>
        <Select onValueChange={handleLayananChange} value={selectedLayanan}>
          <SelectTrigger className="w-full min-w-[300px] max-w-[400px] rounded-md border px-4 py-2">
            <SelectValue placeholder="Pilih Tabel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="keluarga">Layanan Keluarga</SelectItem>
            <SelectItem value="remaja_putri">Layanan Remaja Putri</SelectItem>
            <SelectItem value="ibu_hamil">Layanan Ibu Hamil</SelectItem>
            <SelectItem value="calon_pengantin">
              Layanan Calon Pengantin
            </SelectItem>
            <SelectItem value="anak">Layanan Anak</SelectItem>
            <SelectItem value="lansia">Layanan Lansia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-semibold">Pilih Tahun</label>
        <Select
          onValueChange={handleYearChange}
          value={selectedYear ? selectedYear.toString() : ""}
        >
          <SelectTrigger className="w-full min-w-[300px] max-w-[400px] rounded-md border px-4 py-2">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(monthsByYear).map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedYear && (
        <div className="mb-4">
          <label className="mb-1 block text-sm font-semibold">
            Pilih Bulan
          </label>
          <Select onValueChange={handleMonthChange} value={selectedMonth || ""}>
            <SelectTrigger className="w-full min-w-[300px] max-w-[400px] rounded-md border px-4 py-2">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
              {monthsByYear[selectedYear]?.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="min-w-[300px] sm:min-w-[400px]">
        {loading ? <Skeleton /> : renderSelectedTable()}
      </div>
    </main>
  )
}
