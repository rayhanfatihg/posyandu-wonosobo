"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

export type CalendarProps = {
  highlightedDates?: Date[] // Properti baru untuk tanggal yang di-highlight
} & React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-zinc-500 rounded-md w-9 font-normal text-[0.8rem] text-zinc-400",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center rounded-md text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary [&:has([aria-selected])]:bg-primary first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 [&:has([aria-selected].day-outside)]:bg-primary [&:has([aria-selected])]:bg-primary",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md"
        ),
        day_range_end: "day-range-end rounded-md",
        day_selected:
          "bg-primary rounded-md text-white overflow-hidden hover:bg-primary focus:bg-primary focus:text-white bg-primary hover:bg-primary focus:bg-primary",
        day_today: "bg-primary text-white rounded-md bg-primary",
        day_outside:
          "day-outside text-zinc-500/50 aria-selected:bg-primary aria-selected:text-zinc-500 text-zinc-400 aria-selected:bg-primary aria-selected:text-zinc-400",
        day_disabled: "text-zinc-500/70 opacity-50 text-zinc-400",
        day_range_middle:
          "aria-selected:bg-primary rounded-md aria-selected:text-zinc-900 aria-selected:bg-primary aria-selected:text-zinc-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
