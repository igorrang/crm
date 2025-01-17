"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/service/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 m-3 rounded-md border border-white/35", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-white",
        month: "space-y-4 ",
        caption: "flex justify-center pt-1 relative items-center ",
        caption_label: "text-sm font-medium ",
        nav: "space-x-1 flex items-center ",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 "
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1 ",
        head_row: "flex ",
        head_cell: "text-white/70 rounded-md w-9 font-normal text-[0.8rem] ",
        row: "flex w-full mt-2 ",
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          // Verifica se é o fim ou início do intervalo
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-range-start)]:rounded-l-md",
          "[&:has([aria-selected])]:bg-white/30", // Estilo para seleção
          "[&:has([aria-selected].day-outside)]:bg-white/10", // Estilo para dias fora do mês
          "first:[&:has([aria-selected])]:rounded-l-md", // Primeira célula selecionada
          "last:[&:has([aria-selected])]:rounded-r-md", // Última célula selecionada
          "focus-within:relative focus-within:z-20" // Foco
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_range_start: "day-range-start",
        day_selected: "bg-secondary text-black hover:bg-secondary/70 hover:text-white focus:bg-secondary/70 focus:text-white",
        day_today: "bg-secondary/80 text-black",
        day_outside: "day-outside text-white/40 opacity-60 aria-selected:bg-accent aria-selected:text-muted-foreground aria-selected:opacity-20",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-transparent aria-selected:text-white ",
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
