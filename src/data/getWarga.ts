import db from "@/lib/db"

// Function to get warga data by name
export async function getWargaByName(namaProps: string) {
  try {
    const wargaData = await db.warga.findMany({
      where: {
        nama: {
          contains: namaProps, // Partial match for more flexible search
          mode: "insensitive", // Case-insensitive search
        },
      },
      select: {
        id: true,
        nama: true,
      },
      orderBy: {
        nama: "asc",
      },
    })
    return wargaData
  } catch (error) {
    console.error("Error fetching warga data:", error)
    throw new Error("Unable to fetch warga data")
  }
}

// src/actions/getWarga.ts

export async function getWargaOptions(search: string) {
  const wargaData = await db.warga.findMany({
    where: {
      nama: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      nama: true,
    },
    orderBy: {
      nama: "asc",
    },
    take: 10, // Limit results for performance
  })

  return wargaData
}

// Function to get all warga data
export async function getAllWarga() {
  try {
    const wargaData = await db.warga.findMany({
      select: {
        id: true,
        nama: true,
      },
      orderBy: {
        nama: "asc",
      },
    })
    return wargaData
  } catch (error) {
    console.error("Error fetching all warga data:", error)
    throw new Error("Unable to fetch all warga data")
  }
}
