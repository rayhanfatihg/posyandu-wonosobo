"use server"

import { revalidatePath } from "next/cache"

import db from "@/lib/db"

// Definisikan tipe data untuk jadwal posyandu
interface JadwalPosyanduData {
  namaAcara: string
  tanggal: Date
  jam: string
}

export async function saveJadwalPosyandu(data: JadwalPosyanduData) {
  try {
    // Simpan data jadwal posyandu ke database
    await db.jadwalPosyandu.create({
      data: {
        namaAcara: data.namaAcara,
        tanggal: data.tanggal,
        jam: data.jam,
      },
    })

    // Revalidate path untuk memastikan data terbaru ditampilkan
    revalidatePath("/(dashboard)/dashboard/jadwal-posyandu")

    return { success: true }
  } catch (error) {
    console.error("Terjadi kesalahan saat menyimpan jadwal:", error)
    return { success: false, error: "Gagal menyimpan jadwal" }
  }
}
