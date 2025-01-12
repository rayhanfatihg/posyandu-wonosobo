"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Textarea } from "@/components/ui/textarea"

import { getAllDataWarga } from "../../data-warga/action"
import { ComboboxWarga } from "../ComboboxWarga"
import { saveDataLayananLansia } from "./action"

// Schema Validation with Zod
const layananLansiaSchema = z.object({
  wargaId: z.string().min(1, { message: "Warga ID wajib dipilih" }),
  nama: z.string().min(1, { message: "Nama wajib diisi" }),
  nik: z.string().length(16, { message: "NIK harus 16 karakter" }),
  ttl: z.string().min(1, { message: "Tempat/Tanggal Lahir wajib diisi" }),
  beratBadan: z
    .number({ invalid_type_error: "Berat Badan harus berupa angka" })
    .positive({ message: "Berat Badan harus lebih dari 0" }),
  tinggiBadan: z
    .number({ invalid_type_error: "Tinggi Badan harus berupa angka" })
    .positive({ message: "Tinggi Badan harus lebih dari 0" }),
  tensiDarah: z.string().min(1, { message: "Tensi Darah wajib diisi" }),
  lingkarPerut: z
    .number({ invalid_type_error: "Lingkar Perut harus berupa angka" })
    .positive({ message: "Lingkar Perut harus lebih dari 0" }),
  kolesterol: z
    .number({ invalid_type_error: "Kolesterol harus berupa angka" })
    .positive({ message: "Kolesterol harus lebih dari 0" }),
  gulaDarah: z
    .number({ invalid_type_error: "Gula Darah harus berupa angka" })
    .positive({ message: "Gula Darah harus lebih dari 0" }),
  asamUrat: z
    .number({ invalid_type_error: "Asam Urat harus berupa angka" })
    .positive({ message: "Asam Urat harus lebih dari 0" }),
  keterangan: z.string().optional(),
})

type LayananLansiaFormValues = z.infer<typeof layananLansiaSchema>

export default function LayananLansiaForm() {
  const form = useForm<LayananLansiaFormValues>({
    resolver: zodResolver(layananLansiaSchema),
    defaultValues: {
      wargaId: "",
      nama: "",
      nik: "",
      ttl: "",
      beratBadan: undefined,
      tinggiBadan: undefined,
      tensiDarah: "",
      lingkarPerut: undefined,
      kolesterol: undefined,
      gulaDarah: undefined,
      asamUrat: undefined,
      keterangan: "",
    },
  })

  const onSubmit = async (data: LayananLansiaFormValues) => {
    const result = await saveDataLayananLansia(data)
    if (result.success) {
      alert("Data berhasil disimpan!")
      form.reset()
    } else {
      alert(`Gagal menyimpan data: ${result.error}`)
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

  const fields: Array<{
    name: keyof LayananLansiaFormValues
    label: string
    type: "text" | "number"
    placeholder: string
  }> = [
    {
      name: "tinggiBadan",
      label: "Tinggi Badan Lansia (cm)",
      type: "number",
      placeholder: "Masukkan Tinggi Badan",
    },
    {
      name: "beratBadan",
      label: "Berat Badan Lansia (kg)",
      type: "number",
      placeholder: "Masukkan Berat Badan",
    },
    {
      name: "tensiDarah",
      label: "Tensi Darah",
      type: "text",
      placeholder: "Masukkan Tensi Darah",
    },
    {
      name: "lingkarPerut",
      label: "Lingkar Perut",
      type: "number",
      placeholder: "Masukkan Lingkar Perut",
    },
    {
      name: "kolesterol",
      label: "Kolesterol",
      type: "number",
      placeholder: "Masukkan Kolesterol",
    },
    {
      name: "gulaDarah",
      label: "Gula Darah",
      type: "number",
      placeholder: "Masukkan Gula Darah",
    },
    {
      name: "asamUrat",
      label: "Asam Urat",
      type: "number",
      placeholder: "Masukkan Asam Urat",
    },
    {
      name: "keterangan",
      label: "Keterangan",
      type: "text",
      placeholder: "Masukkan Keterangan",
    },
  ]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex w-[310px] flex-col space-y-2 rounded-md sm:w-[400px]"
      >
        {/* Pilih Warga */}
        <FormField
          control={form.control}
          name="wargaId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Pilih Warga Lansia</Label>
              <FormControl>
                <ComboboxWarga
                  options={wargaOptions}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Pilih lansia..."
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.wargaId?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Other Fields */}
        {fields.map(({ name, label, type, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>{label}</Label>

                <FormControl>
                  {name === "keterangan" ? (
                    <Textarea
                      placeholder={placeholder}
                      {...field}
                      className="max-h-[100px]"
                    />
                  ) : (
                    <Input type={type} placeholder={placeholder} {...field} />
                  )}
                </FormControl>

                <FormMessage>
                  {form.formState.errors[name]?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full">
          Simpan Data
        </Button>
      </form>
    </Form>
  )
}
