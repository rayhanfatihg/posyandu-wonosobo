"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
  "Grafik batang interaktif untuk akses fasilitas keluarga"

// Data mock untuk jumlah keluarga dengan akses ke fasilitas dasar per bulan
const chartData = [
  { bulan: "Januari", airBersih: 30, sanitasi: 20, jaminanKesehatan: 25 },
  { bulan: "Februari", airBersih: 28, sanitasi: 18, jaminanKesehatan: 24 },
  { bulan: "Maret", airBersih: 32, sanitasi: 22, jaminanKesehatan: 28 },
  { bulan: "April", airBersih: 34, sanitasi: 24, jaminanKesehatan: 30 },
  { bulan: "Mei", airBersih: 30, sanitasi: 21, jaminanKesehatan: 26 },
  { bulan: "Juni", airBersih: 29, sanitasi: 23, jaminanKesehatan: 27 },
  { bulan: "Juli", airBersih: 33, sanitasi: 25, jaminanKesehatan: 29 },
  { bulan: "Agustus", airBersih: 31, sanitasi: 22, jaminanKesehatan: 26 },
  { bulan: "September", airBersih: 34, sanitasi: 26, jaminanKesehatan: 31 },
  { bulan: "Oktober", airBersih: 35, sanitasi: 27, jaminanKesehatan: 32 },
  { bulan: "November", airBersih: 30, sanitasi: 23, jaminanKesehatan: 28 },
  { bulan: "Desember", airBersih: 32, sanitasi: 24, jaminanKesehatan: 30 },
]

const chartConfig = {
  airBersih: {
    label: "Akses Air Bersih",
    color: "hsl(var(--chart-1))",
  },
  sanitasi: {
    label: "Akses Sanitasi",
    color: "hsl(var(--chart-2))",
  },
  jaminanKesehatan: {
    label: "Jaminan Kesehatan",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function ChartDemo4() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("airBersih")

  const total = React.useMemo(
    () => ({
      airBersih: chartData.reduce((acc, curr) => acc + curr.airBersih, 0),
      sanitasi: chartData.reduce((acc, curr) => acc + curr.sanitasi, 0),
      jaminanKesehatan: chartData.reduce(
        (acc, curr) => acc + curr.jaminanKesehatan,
        0
      ),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Akses Fasilitas Keluarga</CardTitle>
          <CardDescription>
            Jumlah keluarga dengan akses air bersih, sanitasi, dan jaminan
            kesehatan
          </CardDescription>
        </div>
        <div className="flex">
          {["airBersih", "sanitasi", "jaminanKesehatan"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="fasilitas"
                  labelFormatter={(value) => {
                    return value
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
