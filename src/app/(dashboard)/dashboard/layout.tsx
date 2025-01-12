import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main>
        <SidebarTrigger />

        <div className="flex w-full flex-col px-2 py-16 md:p-16">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
