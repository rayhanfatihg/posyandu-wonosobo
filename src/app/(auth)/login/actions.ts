"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function login(formData: FormData) {
  try {
    const supabase = await createClient()

    // Ekstraksi data email dan password dari formData
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    // Validasi awal apakah email dan password diisi
    if (!data.email || !data.password) {
      return {
        success: false,
        message: "Email dan password harus diisi",
      }
    }

    // Proses login dengan Supabase
    const { error, data: authData } =
      await supabase.auth.signInWithPassword(data)

    // Penanganan error spesifik dari Supabase
    if (error) {
      let errorMessage = "Tidak dapat login"

      switch (error.status) {
        case 400:
          errorMessage = "Periksa kembali email dan password."
          break
        case 401:
          errorMessage = "Email atau password salah."
          break
        case 403:
          errorMessage = "Akses tidak diizinkan."
          break
        case 500:
          errorMessage = "Terjadi kesalahan pada server. Coba lagi nanti."
          break
        default:
          errorMessage = error.message || errorMessage
      }

      return {
        success: false,
        message: errorMessage,
      }
    }

    // Berhasil login
    if (authData) {
      revalidatePath("/", "layout")

      return {
        success: true,
        message: "Berhasil login.",
      }
    }

    // Penanganan kondisi tidak terduga
    return {
      success: false,
      message: "Terjadi kesalahan yang tidak diketahui. Coba lagi.",
    }
  } catch (err) {
    // Penanganan error pada proses di luar Supabase (misalnya error jaringan atau logic)
    return {
      success: false,
      message:
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan yang tidak diketahui.",
    }
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
