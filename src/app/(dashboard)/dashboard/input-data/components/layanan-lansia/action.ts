"use server"

import db from "@/lib/db"

export async function saveDataLayananLansia(data: {
  wargaId: string
  beratBadan: number
  tinggiBadan: number
  tensiDarah: string
  lingkarPerut: number
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
        beratBadan: data.beratBadan,
        tinggiBadan: data.tinggiBadan,
        tensiDarah: data.tensiDarah,
        lingkarPerut: data.lingkarPerut,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error saving data:", error)
    return { success: false, error: "Gagal menyimpan data" }
  }
}
