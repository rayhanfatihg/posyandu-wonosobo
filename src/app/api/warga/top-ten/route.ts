import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

// Define a GET handler for fetching the top 10 warga entries
export async function GET() {
  try {
    const wargaData = await prisma.warga.findMany({
      select: {
        id: true,
        nama: true,
      },
      orderBy: {
        nama: "asc",
      },
      take: 10,
    })

    return NextResponse.json(wargaData)
  } catch (error) {
    console.error("Error fetching top 10 warga:", error)
    return NextResponse.json(
      { error: "Failed to fetch warga data" },
      { status: 500 }
    )
  }
}
