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

export const description =
  "Grafik batang dengan label untuk pemeriksaan ibu hamil"

// Data mock untuk jumlah pemeriksaan ibu hamil per bulan
const chartData = [
  { bulan: "Januari", pemeriksaan: 25 },
  { bulan: "Februari", pemeriksaan: 30 },
  { bulan: "Maret", pemeriksaan: 20 },
  { bulan: "April", pemeriksaan: 35 },
  { bulan: "Mei", pemeriksaan: 28 },
  { bulan: "Juni", pemeriksaan: 40 },
]

const chartConfig = {
  pemeriksaan: {
    label: "Pemeriksaan Ibu Hamil",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ChartDemo3() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jumlah Pemeriksaan Ibu Hamil</CardTitle>
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
            <Bar
              dataKey="pemeriksaan"
              fill="var(--color-pemeriksaan)"
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
          Menampilkan total pemeriksaan ibu hamil per bulan
        </div>
      </CardFooter>
    </Card>
  )
}
