"use server"

import db from "@/lib/db"

export async function saveDataLayananLansia(data: {
  wargaId: string
  nama: string
  nik: string
  ttl: string
  beratBadan: number
  tinggiBadan: number
  tensiDarah: string
  lingkarPerut: number
  kolesterol: number
  gulaDarah: number
  asamUrat: number
  keterangan?: string
}) {
  try {
    const warga = await db.warga.findUnique({
      where: { id: data.wargaId },
    })
    if (!warga) {
      return { success: false, error: "Warga tidak ditemukan" }
    }

    await db.layananLansia.create({
      data: {
        wargaId: data.wargaId,
        nama: data.nama,
        nik: data.nik,
        ttl: data.ttl,
        beratBadan: data.beratBadan,
        tinggiBadan: data.tinggiBadan,
        tensiDarah: data.tensiDarah,
        lingkarPerut: data.lingkarPerut,
        kolesterol: data.kolesterol,
        gulaDarah: data.gulaDarah,
        asamUrat: data.asamUrat,
        keterangan: data.keterangan || "",
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error saving data:", error)
    return { success: false, error: "Gagal menyimpan data" }
  }
}
