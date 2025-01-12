"use server"

// action.ts (Server-side action file)
import db from "@/lib/db" // Sesuaikan path ini sesuai dengan lokasi db

export type LayananAnak = {
  id: string
  namaOrangTua: string
  jenisKelamin: "LAKI_LAKI" | "PEREMPUAN"
  statusGiziKurang: boolean
  statusGiziBuruk: boolean
  stunting: boolean
  imunisasiHbO: boolean
  imunisasiBcgPolio1: boolean
  statusKelengkapan: boolean
  createdAt: string // Asumsikan format string ISO
  warga?: {
    nama: string
  }
}

// Fungsi untuk mengambil data LayananAnak dari database
export async function getLayananAnakData(
  year?: number,
  month?: string
): Promise<LayananAnak[]> {
  try {
    const startDate =
      year && month ? new Date(`${year}-${month}-01`) : undefined
    const endDate = startDate
      ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
      : undefined

    const layananAnak = await db.layananAnak.findMany({
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
            nama: true,
          },
        },
      },
    })

    return (
      layananAnak.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
      })) || []
    )
  } catch (error) {
    console.error("Error fetching LayananAnak data:", error)
    return []
  }
}
