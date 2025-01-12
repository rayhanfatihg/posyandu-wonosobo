"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

export const description = "Grafik Donat dengan teks untuk Status Gizi Anak"

// Data mock untuk status gizi anak di posyandu
const chartData = [
  { status: "Gizi Baik", jumlah: 150, fill: "hsl(var(--chart-1))" },
  { status: "Kurang Gizi", jumlah: 80, fill: "hsl(var(--chart-2))" },
  { status: "Gizi Buruk", jumlah: 45, fill: "hsl(var(--chart-3))" },
]

const chartConfig = {
  jumlah: {
    label: "Jumlah Anak",
  },
  "Gizi Baik": {
    label: "Gizi Baik",
    color: "hsl(var(--chart-1))",
  },
  "Kurang Gizi": {
    label: "Kurang Gizi",
    color: "hsl(var(--chart-2))",
  },
  "Gizi Buruk": {
    label: "Gizi Buruk",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function ChartDemo2() {
  const totalAnak = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.jumlah, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Gizi Anak</CardTitle>
        <CardDescription>Data Terkini</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="jumlah"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAnak.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Anak
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tren status gizi menunjukkan peningkatan{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan distribusi status gizi anak berdasarkan data posyandu
          terbaru.
        </div>
      </CardFooter>
    </Card>
  )
}
