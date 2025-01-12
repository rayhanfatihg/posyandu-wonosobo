// src/app/api/warga/search/route.ts

import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma" // Assumes prisma is initialized in lib/prisma.ts

// Define a GET request handler
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q") || ""

  try {
    const wargaData = await prisma.warga.findMany({
      where: {
        nama: {
          contains: query,
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
    })

    return NextResponse.json(wargaData)
  } catch (error) {
    console.error("Error fetching warga data:", error)
    return NextResponse.json(
      { error: "Failed to fetch warga data" },
      { status: 500 }
    )
  }
}
