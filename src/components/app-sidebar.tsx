import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import {
  Calendar,
  ClipboardType,
  Home,
  Inbox,
  LogOut,
  Newspaper,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { signOut } from "@/app/(auth)/login/actions"

const items = [
  {
    title: "Reports",
    url: "/",
    icon: Home,
  },
  {
    title: "Tambah Data Warga",
    url: "/input-data/data-warga",
    icon: Inbox,
  },
  {
    title: "Input Data Posyandu",
    url: "/input-data",
    icon: Inbox,
  },
  {
    title: "Tabel Data Posyandu",
    url: "/tabel-data",
    icon: ClipboardType,
  },
  {
    title: "Tambah Artikel & Berita",
    url: "/berita-artikel",
    icon: Newspaper,
  },
  {
    title: "Atur Posting Artikel & Berita",
    url: "/tabel-berita-artikel",
    icon: Newspaper,
  },
  {
    title: "Atur Jadwal Posyandu",
    url: "/jadwal-posyandu",
    icon: Calendar,
  },
]

export default async function AppSidebar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarGroup>
          <Link href="/" className="flex items-center" prefetch={false}>
            <Image
              src="/logo-posyandu.png"
              width={1000}
              height={1000}
              alt="Posyandu Marga Agung"
              className="h-12 w-16"
            />
            <span className="sr-only">Posyandu Marga Agung</span>
          </Link>

          <SidebarGroupLabel>Dashboard Posyandu Marga Agung</SidebarGroupLabel>

          <p className="mt-10 px-2 text-sm">Hallo, {user?.email}</p>

          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/dashboard${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem className="mt-20">
                <SidebarMenuButton asChild>
                  <form action={signOut}>
                    <button className="flex items-center gap-2">
                      <LogOut />
                      <span>Keluar Akun</span>
                    </button>
                  </form>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
