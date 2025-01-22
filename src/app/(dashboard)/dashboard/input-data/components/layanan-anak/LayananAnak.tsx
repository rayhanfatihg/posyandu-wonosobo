"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getAllDataWarga } from "../../data-warga/action"
import { ComboboxWarga } from "../ComboboxWarga"
import { saveDataLayananAnak } from "./action"

const layananSchema = z.object({
  ibuId: z.string().min(1, { message: "Ibu ID wajib diisi" }),
  ayahId: z.string().min(1, { message: "Ayah ID wajib diisi" }),
  anakId: z.string().min(1, { message: "Anak ID wajib diisi" }),
  jenisKelaminAnak: z.enum(["LAKI_LAKI", "PEREMPUAN"], {
    errorMap: () => ({ message: "Jenis Kelamin wajib dipilih" }),
  }),
  tinggiBadanIbu: z.preprocess(
    (val) => parseFloat(val as string), // preprocess to number
    z.number().min(1, { message: "Tinggi Badan Ibu harus lebih dari 0" })
  ),
  beratBadanIbu: z.preprocess(
    (val) => parseFloat(val as string), // preprocess to number
    z.number().min(1, { message: "Berat Badan Ibu harus lebih dari 0" })
  ),
  lingkarLenganIbu: z.preprocess(
    (val) => parseFloat(val as string), // preprocess to number
    z.number().min(1, { message: "Lingkar Lengan Ibu harus lebih dari 0" })
  ),
  lingkarPinggangIbu: z.preprocess(
    (val) => parseFloat(val as string), // preprocess to number
    z.number().min(1, { message: "Lingkar Pinggang Ibu harus lebih dari 0" })
  ),
  alatKontrasepsi: z
    .string()
    .min(1, { message: "Alat Kontrasepsi wajib diisi" }),
  tinggiBadanAnak: z.preprocess(
    (val) => parseFloat(val as string), // preprocess to number
    z.number().min(1, { message: "Tinggi Badan Anak harus lebih dari 0" })
  ),
  beratBadanAnak: z.preprocess(
    (val) => parseFloat(val as string), // preprocess to number
    z.number().min(1, { message: "Berat Badan Anak harus lebih dari 0" })
  ),
  umurAnak: z.preprocess(
    (val) => parseFloat(val as string), // preprocess to number
    z.number().min(0.1, { message: "Umur Anak harus lebih dari 0" })
  ),
  lingkarLenganAnak: z.preprocess(
    (val) => parseFloat(val as string), // preprocess to number
    z.number().min(1, { message: "Lingkar Lengan Anak harus lebih dari 0" })
  ),
  lingkarKepalaAnak: z.preprocess(
    (val) => parseFloat(val as string), // preprocess to number
    z.number().min(1, { message: "Lingkar Kepala Anak harus lebih dari 0" })
  ),
})

type LayananFormValues = z.infer<typeof layananSchema>

export default function LayananAnakForm() {
  const { toast } = useToast()

  const form = useForm<LayananFormValues>({
    resolver: zodResolver(layananSchema),
    defaultValues: {
      anakId: "",
      tinggiBadanAnak: 0,
      beratBadanAnak: 0,
      umurAnak: 0,
      lingkarLenganAnak: 0,
      lingkarKepalaAnak: 0,
    },
  })

  const onSubmit = async (data: LayananFormValues) => {
    const result = await saveDataLayananAnak(data)

    if (result.success) {
      toast({
        title: "Data berhasil disimpan!",
        description: "Data layanan anak berhasil disimpan",
      })
      form.reset()
    } else {
      toast({
        title: "Gagal menyimpan data!",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const [wargaOptions, setWargaOptions] = React.useState<
    { value: string; label: string }[]
  >([])

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllDataWarga()
        if (result.success && result.data) {
          setWargaOptions(
            result.data.map((warga: { id: string; nama: string }) => ({
              value: warga.id,
              label: warga.nama,
            }))
          )
        } else {
          console.error(result.error || "Data is undefined")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex w-[310px] flex-col space-y-2 rounded-md sm:w-[400px]"
      >
        {/* Pilih Nama Anak/Balita */}
        <FormField
          control={form.control}
          name="anakId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Pilih Nama Anak/Balita</Label>
              <FormControl>
                <ComboboxWarga
                  options={wargaOptions}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Pilih nama anak/balita..."
                />
              </FormControl>
              <FormMessage>{form.formState.errors.anakId?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Berat Badan Anak/Balita */}
        <FormField
          control={form.control}
          name="beratBadanAnak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Berat Badan Anak/Balita (kg)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Berat Badan Anak/Balita"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.beratBadanAnak?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Tinggi Badan Anak/Balita */}
        <FormField
          control={form.control}
          name="tinggiBadanAnak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Tinggi Badan Anak/Balita (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Tinggi Badan Anak/Balita"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.tinggiBadanAnak?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Lingkar Lengan Anak/Balita */}
        <FormField
          control={form.control}
          name="lingkarLenganAnak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Lingkar Lengan Anak/Balita (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Lingkar Lengan Anak/Balita"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lingkarLenganAnak?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Lingkar Kepala Anak/Balita */}
        <FormField
          control={form.control}
          name="lingkarLenganAnak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Lingkar Kepala Anak/Balita (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Lingkar Lengan Anak/Balita"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lingkarKepalaAnak?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Simpan Data
        </Button>
      </form>
    </Form>
  )
}
