"use server"

import { revalidatePath } from "next/cache"

import db from "@/lib/db" // Pastikan path ini benar dan sesuai struktur project Anda

// Fungsi untuk menyimpan data warga ke database
export async function saveDataWarga({
  nama,
  nik,
  tanggalLahir,
  umur,
  dusun,
}: {
  nama: string
  nik: string
  tanggalLahir: Date
  umur: number
  dusun?: string
}) {
  try {
    // Periksa apakah NIK sudah ada di database
    const existingWarga = await db.warga.findUnique({
      where: { nik },
    })

    if (existingWarga) {
      return { success: false, error: "Data warga dengan NIK ini sudah ada" }
    }

    // Simpan data warga baru ke database
    await db.warga.create({
      data: {
        nama,
        nik,
        tanggalLahir,
        umur,
        dusun,
      },
    })

    // Revalidasi path untuk memastikan data baru tampil
    revalidatePath("(dashboard)/dashboard/input-data/data-warga")
    return { success: true }
  } catch (error) {
    console.error("Terjadi kesalahan saat menyimpan data warga:", error)
    return { success: false, error: "Gagal menyimpan data warga" }
  }
}

export async function getAllDataWarga() {
  try {
    const wargaList = await db.warga.findMany({
      include: {
        LayananLansia: true,
        LayananIbuAnakAnak: true,
        LayananIbuAnakIbu: true,
        LayananIbuAnakAyah: true,
      },
    })

    return { success: true, data: wargaList }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data warga:", error)
    return { success: false, error: "Gagal mengambil data warga" }
  }
}
