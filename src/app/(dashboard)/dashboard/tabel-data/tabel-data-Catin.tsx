import React, { useState } from "react"

import Footer from "@/components/footer"

export default function TabelDataCatin() {
  return (
    <main className="flex min-h-screen flex-col justify-start">
      <div className="min-h-screen bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">TABEL DATA CALON PENGANTIN</h2>
        {/* Bagian Pencarian dan Filter */}
        <div className="mb-4 flex justify-between">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Telusuri"
              className="w-full max-w-xs rounded-lg border border-gray-300 p-2"
            />
            <button className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
              Filter
            </button>
          </div>
          {/* Dropdown Filter */}
          <div className="flex flex-col rounded-lg border border-gray-300 bg-white p-2 shadow-md">
            <button className="py-1 text-left hover:bg-gray-100">
              Tanggal (Terbaru)
            </button>
            <button className="py-1 text-left hover:bg-gray-100">
              Tanggal (Terlama)
            </button>
            <button className="py-1 text-left hover:bg-gray-100">
              Nama (A-Z)
            </button>
            <button className="py-1 text-left hover:bg-gray-100">
              Nama (Z-A)
            </button>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4">Nama</th>
                <th className="p-4">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {/* Data Baris */}
              {Array(10)
                .fill("")
                .map((_, i) => (
                  <tr
                    key={i}
                    className={`border-b ${i % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <td className="truncate p-4">Muhammad Rizky Aditia...</td>
                    <td className="p-4">28/01/2024</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Footer />
      </div>
    </main>
  )
}
