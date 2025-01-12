// src/app/(dashboard)/dashboard/tabel-data/components/tabel-data-lansia/action.ts
"use server"
import db from "@/lib/db"

export type LayananLansia = {
  id: string
  wargaId: string
  gds: number
  beratBadan: number
  tinggiBadan: number
  lingkarPinggang: number
  tekananDarah: string
  createdAt: Date
  updatedAt: Date
  warga?: {
    nama: string // Add resident's name from `Warga`
  }
}

export async function getLayananLansiaData(
  year?: number,
  month?: string
): Promise<LayananLansia[]> {
  try {
    // Create date range if both year and month are provided
    const startDate =
      year && month ? new Date(`${year}-${month}-01`) : undefined
    const endDate = startDate
      ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
      : undefined

    const layananLansiaData = await db.layananLansia.findMany({
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

    return layananLansiaData || []
  } catch (error) {
    console.error("Error fetching Layanan Lansia data:", error)
    return []
  }
}
