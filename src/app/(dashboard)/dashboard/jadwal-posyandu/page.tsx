"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { id as localeID } from "date-fns/locale" // Import locale Indonesia
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar" // Import Calendar dari ShadCN
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { saveJadwalPosyandu } from "./action" // Import server action

// Define the validation schema with Zod
const jadwalSchema = z
  .object({
    namaAcara: z.string().min(1, { message: "Nama acara wajib diisi" }),
    tanggal: z.date({ required_error: "Tanggal wajib diisi" }),
    jam: z.string().min(1, { message: "Jam acara wajib diisi" }),
  })
  .superRefine((data, ctx) => {
    Object.keys(data).forEach((key) => {
      if (!data[key as keyof typeof data]) {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: "Data wajib diisi terlebih dahulu",
        })
      }
    })
  })

export type JadwalFormValues = z.infer<typeof jadwalSchema>

export default function JadwalPosyanduPage() {
  const form = useForm<JadwalFormValues>({
    resolver: zodResolver(jadwalSchema),
    mode: "onChange", // Enable real-time validation
  })

  const onSubmit = async (data: JadwalFormValues) => {
    const result = await saveJadwalPosyandu(data)

    if (result.success) {
      toast({
        title: "Jadwal berhasil disimpan",
        description: "Data jadwal posyandu berhasil disimpan",
      })

      form.reset()
    } else {
      toast({
        title: "Gagal menyimpan jadwal",
        description: result.error || "Terjadi kesalahan saat menyimpan jadwal",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className="text-2xl font-bold">Atur Jadwal Posyandu</h1>
      <div className="mt-10">
        <h2 className="mb-6 text-lg font-bold">
          Tambah jadwal posyandu bulan ini
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-w-[300px] flex-col rounded-md sm:min-w-[400px]"
          >
            {/* Nama Acara Field */}
            <FormField
              control={form.control}
              name="namaAcara"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="namaAcara">Nama Acara</Label>
                  <FormControl>
                    <Input
                      id="namaAcara"
                      placeholder="Masukkan nama acara"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.namaAcara?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Tanggal Field with DatePicker */}
            <FormField
              control={form.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem>
                  <Label>Tanggal</Label>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {/* @ts-ignore */}
                          {field.value
                            ? format(field.value, "PPP", {
                                locale: localeID,
                              })
                            : "Pilih Tanggal"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.tanggal?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Jam Field */}
            <FormField
              control={form.control}
              name="jam"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="jam">Jam</Label>
                  <FormControl>
                    <Input
                      id="jam"
                      type="time"
                      placeholder="Masukkan jam acara"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.jam?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-4"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Menyimpan..." : "Simpan Jadwal"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
