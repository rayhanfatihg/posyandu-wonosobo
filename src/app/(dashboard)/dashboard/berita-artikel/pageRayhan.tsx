"use client"

import React, { useState } from "react"

import Footer from "@/components/footer"

import BlogForm from "./BlogForm"

export default function BeritaArtikelPage() {
  const [isTambahArtikel, setIsTambahArtikel] = useState(false)

  // Fungsi untuk mengubah tampilan ke form tambah artikel
  const handleTambahClick = () => {
    setIsTambahArtikel(true)
  }

  // Fungsi untuk kembali ke daftar artikel
  const handleKembaliClick = () => {
    setIsTambahArtikel(false)
  }

  return (
    <main className="flex min-h-screen flex-col justify-start">
      <div className="mt-96 min-h-screen bg-white p-6">
        {isTambahArtikel ? (
          // Halaman Form Tambah Artikel
          <div>
            <button
              className="mb-4 rounded-lg bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
              onClick={handleKembaliClick}
            >
              &lt; Kembali
            </button>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Contoh: Pencegahan Stunting"
                className="w-full rounded-lg border border-gray-300 p-2"
              />
              <div className="flex items-center">
                <label className="mr-4">Gambar</label>
                <input
                  type="file"
                  className="rounded-lg border border-gray-300 p-2"
                />
              </div>
              <textarea
                placeholder="Tulis Berita"
                className="h-40 w-full rounded-lg border border-gray-300 p-2"
              ></textarea>
              <button className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                Upload
              </button>
            </div>
          </div>
        ) : (
          // Halaman Daftar Artikel
          <div>
            <div className="mb-4 flex justify-between">
              <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                Hapus Semua Artikel & Berita
              </button>
              <button
                className="rounded-lg bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
                onClick={handleTambahClick}
              >
                Tambah
              </button>
            </div>

            <div className="rounded-lg bg-gray-100 p-4">
              <div className="grid grid-cols-3 gap-4 py-2 font-semibold">
                <div className="text-center">Urutan</div>
                <div className="text-center">Judul</div>
                <div className="text-center">Aksi</div>
              </div>

              {/* Item Artikel 1 */}
              <div className="grid grid-cols-3 items-center gap-4 border-b py-3">
                <div className="flex flex-col items-center">
                  <span>1</span>
                  <span className="text-lg">⬇️</span>
                </div>
                <div className="text-center">
                  <p>Hamil dapat menyebabkan lingkaran perut melebar 1</p>
                </div>
                <div className="flex justify-center gap-2">
                  <button className="rounded-lg bg-gray-200 px-4 py-1 text-black hover:bg-gray-300">
                    Edit
                  </button>
                  <button className="rounded-lg bg-red-500 px-4 py-1 text-white hover:bg-red-600">
                    Hapus
                  </button>
                </div>
              </div>
              {/* Item Artikel 2 */}

              <div className="grid grid-cols-3 items-center gap-4 border-b py-3">
                <div className="flex flex-col items-center">
                  <span className="text-lg">⬆️</span>
                  <span>2</span>
                  <span className="text-lg">⬇️</span>
                </div>
                <div className="text-center">
                  <p>Hamil dapat menyebabkan lingkaran perut melebar 2</p>
                </div>
                <div className="flex justify-center gap-2">
                  <button className="rounded-lg bg-gray-200 px-4 py-1 text-black hover:bg-gray-300">
                    Edit
                  </button>
                  <button className="rounded-lg bg-red-500 px-4 py-1 text-white hover:bg-red-600">
                    Hapus
                  </button>
                </div>
              </div>

              {/* Item Artikel 3 */}
              <div className="grid grid-cols-3 items-center gap-4 py-3">
                <div className="flex flex-col items-center">
                  <span className="text-lg">⬆️</span>
                  <span>3</span>
                </div>
                <div className="text-center">
                  <p>Hamil dapat menyebabkan lingkaran perut melebar 3</p>
                </div>
                <div className="flex justify-center gap-2">
                  <button className="rounded-lg bg-gray-200 px-4 py-1 text-black hover:bg-gray-300">
                    Edit
                  </button>
                  <button className="rounded-lg bg-red-500 px-4 py-1 text-white hover:bg-red-600">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
