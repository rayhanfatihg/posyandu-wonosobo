"use server"

import { createClient } from "@/utils/supabase/server"
import { JenisKelamin } from "@prisma/client"

import db from "@/lib/db"

export async function saveDataLayananAnak(data: {
  ibuId: string
  ayahId: string
  anakId: string
  tinggiBadanIbu: number
  beratBadanIbu: number
  lingkarLenganIbu: number
  lingkarPinggangIbu: number
  alatKontrasepsi: string
  jenisKelaminAnak: JenisKelamin // Changed to jenisKelaminAnak
  tinggiBadanAnak: number
  beratBadanAnak: number
  umurAnak: number
  lingkarLenganAnak: number
  lingkarKepalaAnak: number
}) {
  try {
    // Validasi apakah user sudah login
    const user = await (await createClient()).auth.getUser()

    if (!user) {
      return {
        success: false,
        error: "Anda belum login",
      }
    }

    // Validasi apakah warga Ibu, Ayah, dan Anak ada di database
    const ibu = await db.warga.findUnique({
      where: { id: data.ibuId },
    })

    const ayah = await db.warga.findUnique({
      where: { id: data.ayahId },
    })

    const anak = await db.warga.findUnique({
      where: { id: data.anakId },
    })

    if (!ibu || !ayah || !anak) {
      return {
        success: false,
        error: "Data Ibu, Ayah, atau Anak tidak ditemukan",
      }
    }

    // Menyimpan data layanan anak
    await db.LayananAnak.create({
      data: {
        anakId: data.anakId,
        tinggiBadanAnak: data.tinggiBadanAnak,
        beratBadanAnak: data.beratBadanAnak,
        lingkarLenganAnak: data.lingkarLenganAnak,
        lingkarKepalaAnak: data.lingkarKepalaAnak,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error saving data:", error)

    // Handling error yang lebih spesifik
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return {
      success: false,
      error: "Gagal menyimpan data karena error tak terduga",
    }
  }
}
