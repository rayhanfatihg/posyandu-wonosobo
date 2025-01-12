"use server"

import db from "@/lib/db"

export type LayananRemajaPutri = {
  id: string
  ttd: boolean
  anemia: boolean
  hasilAnemia: boolean
  createdAt: Date
  updatedAt: Date
  warga?: {
    nama: string // Add resident's name from `Warga`
  }
}

export async function getLayananRemajaPutriData(
  year?: number,
  month?: string
): Promise<LayananRemajaPutri[]> {
  try {
    // Create date range if both year and month are provided
    const startDate =
      year && month ? new Date(`${year}-${month}-01`) : undefined
    const endDate = startDate
      ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
      : undefined

    const layananRemajaPutriData = await db.layananRemajaPutri.findMany({
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

    return layananRemajaPutriData || []
  } catch (error) {
    console.error("Error fetching Layanan Remaja Putri data:", error)
    return []
  }
}
