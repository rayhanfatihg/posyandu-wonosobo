"use server"

import db from "@/lib/db"

export type LayananCalonPengantin = {
  id: string
  tanggalPernikahan: string // formatted as string
  periksaKesehatan: boolean
  bimbinganPerkawinan: boolean
  createdAt: string // formatted as string
  warga?: {
    nama: string // Add resident's name from `Warga`
  }
}

export async function getLayananCalonPengantinData(
  year?: number,
  month?: string
): Promise<LayananCalonPengantin[]> {
  try {
    const startDate =
      year && month ? new Date(`${year}-${month}-01`) : undefined
    const endDate = startDate
      ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
      : undefined

    const layananCalonPengantinData = await db.layananCalonPengantin.findMany({
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

    return (
      layananCalonPengantinData.map((data) => ({
        ...data,
        tanggalPernikahan: data.tanggalPernikahan.toISOString(),
        createdAt: data.createdAt.toISOString(),
      })) || []
    )
  } catch (error) {
    console.error("Error fetching Layanan Calon Pengantin data:", error)
    return []
  }
}
