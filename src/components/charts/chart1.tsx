"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Grafik batang beberapa data layanan posyandu"

// Data mock untuk metrik posyandu bulanan
const chartData = [
  { bulan: "Januari", imunisasi: 45, pemeriksaan: 32, gdsRataRata: 3.1 },
  { bulan: "Februari", imunisasi: 50, pemeriksaan: 28, gdsRataRata: 3.3 },
  { bulan: "Maret", imunisasi: 40, pemeriksaan: 35, gdsRataRata: 3.2 },
]

const chartConfig = {
  imunisasi: {
    label: "Imunisasi (Anak)",
    color: "hsl(var(--chart-1))",
  },
  pemeriksaan: {
    label: "Pemeriksaan (Ibu Hamil)",
    color: "hsl(var(--chart-2))",
  },
  gdsRataRata: {
    label: "Rata-rata GDS (Lansia)",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function ChartDemo1() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metrik Layanan Posyandu</CardTitle>
        <CardDescription>Ikhtisar Bulanan</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: any) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="imunisasi" fill="hsl(var(--chart-1))" radius={4} />
            <Bar dataKey="pemeriksaan" fill="hsl(var(--chart-2))" radius={4} />
            <Bar dataKey="gdsRataRata" fill="hsl(var(--chart-3))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Metrik layanan menunjukkan tren positif{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Data menunjukkan aktivitas layanan bulanan untuk imunisasi,
          pemeriksaan, dan skor GDS lansia.
        </div>
      </CardFooter>
    </Card>
  )
}
