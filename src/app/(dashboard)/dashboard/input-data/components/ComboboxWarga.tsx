"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronsDown, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function ComboboxWarga({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
}: {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("") // State untuk pencarian

  // Filter data berdasarkan input pencarian
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-[310px] sm:w-[400px]">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[310px] p-0 sm:w-[400px]">
        <Command>
          {/* Input Pencarian */}
          <div className="flex items-center border-b px-3">
            <input
              type="text"
              placeholder="Cari nama..."
              className="h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update nilai pencarian
            />
          </div>
          <CommandList>
            {/* Tampilkan pesan jika tidak ada hasil */}
            {filteredOptions.length === 0 && (
              <CommandEmpty>Pilihan tidak ada</CommandEmpty>
            )}
            <CommandGroup>
              {/* Map hasil yang sudah difilter */}
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
