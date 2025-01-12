// action.ts
import db from "@/lib/db" // Pastikan lokasi ini sesuai dengan konfigurasi Anda.

export async function getJadwalPosyanduThisMonth() {
  const startOfMonth = new Date(new Date().setDate(1))
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  )

  return await db.jadwalPosyandu.findMany({
    where: {
      tanggal: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    select: {
      tanggal: true,
      namaAcara: true,
      jam: true,
    },
  })
}
