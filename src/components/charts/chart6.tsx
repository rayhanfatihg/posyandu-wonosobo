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

export const description = "Grafik batang dengan label untuk pemeriksaan anak"

// Data mock untuk jumlah pemeriksaan kesehatan anak per bulan
const chartData = [
  { bulan: "Januari", imunisasi: 45, statusGizi: 30 },
  { bulan: "Februari", imunisasi: 50, statusGizi: 28 },
  { bulan: "Maret", imunisasi: 40, statusGizi: 25 },
  { bulan: "April", imunisasi: 35, statusGizi: 22 },
  { bulan: "Mei", imunisasi: 60, statusGizi: 32 },
  { bulan: "Juni", imunisasi: 55, statusGizi: 30 },
]

const chartConfig = {
  imunisasi: {
    label: "Pemeriksaan Imunisasi",
    color: "hsl(var(--chart-1))",
  },
  statusGizi: {
    label: "Pemeriksaan Status Gizi",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartDemo6() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jumlah Pemeriksaan Kesehatan Anak</CardTitle>
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
            <Bar dataKey="imunisasi" fill="hsl(var(--chart-1))" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="statusGizi" fill="hsl(var(--chart-2))" radius={8}>
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
          Tren pemeriksaan anak meningkat bulan ini{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan total pemeriksaan imunisasi dan status gizi anak per bulan
        </div>
      </CardFooter>
    </Card>
  )
}
