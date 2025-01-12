"use server"

import db from "@/lib/db"

export type LayananKeluarga = {
  id: string
  namaKepalaKeluarga: string
  dusun: string
  anak_0_59_bulan: number
  kategoriKeluargaRentan: boolean
  kartuKeluarga: boolean
  jambanSehat: boolean
  sumberAirBersih: boolean
  jaminanSosial: boolean
  jaminanKesehatan: boolean
  aksesSanitasi: boolean
  pendampinganKeluarga: boolean
  ketahananPangan: boolean
  createdAt: Date
  updatedAt: Date
}

export async function getLayananKeluargaData(
  year?: number,
  month?: string
): Promise<LayananKeluarga[]> {
  try {
    // Create date range if both year and month are provided
    const startDate =
      year && month ? new Date(`${year}-${month}-01`) : undefined
    const endDate = startDate
      ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
      : undefined

    const layananKeluargaData = await db.layananKeluarga.findMany({
      where: {
        ...(startDate &&
          endDate && {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }),
      },
      orderBy: { createdAt: "desc" },
      include: {
        warga: {
          select: {
            nama: true, // Include only the `nama` field from the `Warga` model
          },
        },
      },
    })

    return layananKeluargaData || []
  } catch (error) {
    console.error("Error fetching Layanan Keluarga data:", error)
    return []
  }
}
