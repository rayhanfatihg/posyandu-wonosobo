"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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

export const description = "Grafik batang dengan label untuk pemeriksaan lansia"

// Data mock untuk jumlah pemeriksaan kesehatan lansia per bulan
const chartData = [
  { bulan: "Januari", pemeriksaanGds: 12, pemeriksaanTekananDarah: 18 },
  { bulan: "Februari", pemeriksaanGds: 15, pemeriksaanTekananDarah: 22 },
  { bulan: "Maret", pemeriksaanGds: 10, pemeriksaanTekananDarah: 16 },
  { bulan: "April", pemeriksaanGds: 18, pemeriksaanTekananDarah: 24 },
  { bulan: "Mei", pemeriksaanGds: 20, pemeriksaanTekananDarah: 30 },
  { bulan: "Juni", pemeriksaanGds: 25, pemeriksaanTekananDarah: 28 },
]

const chartConfig = {
  pemeriksaanGds: {
    label: "Pemeriksaan GDS",
    color: "hsl(var(--chart-1))",
  },
  pemeriksaanTekananDarah: {
    label: "Pemeriksaan Tekanan Darah",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartDemo5() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jumlah Pemeriksaan Lansia</CardTitle>
        <CardDescription>Periode Januari - Juni</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="pemeriksaanGds" fill="hsl(var(--chart-1))" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="pemeriksaanTekananDarah"
              fill="hsl(var(--chart-2))"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tren pemeriksaan meningkat bulan ini{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan total pemeriksaan GDS dan tekanan darah lansia per bulan
        </div>
      </CardFooter>
    </Card>
  )
}
