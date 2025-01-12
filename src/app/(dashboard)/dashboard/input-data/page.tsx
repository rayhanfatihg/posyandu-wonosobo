"use client"

import React, { useEffect, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import LayananIbuAnak from "./components/layanan-ibu-anak/LayananIbuAnak"
import LayananLansiaForm from "./components/layanan-lansia/LayananLansia"

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-3/4 rounded bg-gray-300"></div>
      <div className="h-4 w-5/6 rounded bg-gray-300"></div>
      <div className="h-4 w-1/2 rounded bg-gray-300"></div>
    </div>
  )
}

export default function InputDataPage() {
  const [selectedTab, setSelectedTab] = useState("ibuanak")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedTab = localStorage.getItem("selectedTab")
    if (storedTab) {
      setSelectedTab(storedTab)
    }
    setLoading(false)
  }, [])

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    localStorage.setItem("selectedTab", value)
  }

  return (
    <main className="min-h-screen w-full">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Pilih Jenis Layanan</h1>

        {/* Tabs from ShadCN */}
        <Tabs
          value={selectedTab}
          onValueChange={handleTabChange}
          className="mt-4"
        >
          <TabsList className="flex w-[310px] sm:w-[400px]">
            <TabsTrigger value="ibuanak" className="w-full">
              Layanan Ibu & Anak
            </TabsTrigger>
            <TabsTrigger value="lansia" className="w-full">
              Layanan Lansia
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="ibuanak">
            {loading ? <Skeleton /> : <LayananIbuAnak />}
          </TabsContent>
          <TabsContent value="lansia">
            {loading ? <Skeleton /> : <LayananLansiaForm />}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
