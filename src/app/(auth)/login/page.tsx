"use client"

import { useState } from "react"
import Image from "next/image"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { login } from "./actions"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await login(formData)

    setIsLoading(false)

    if (response.success) {
      toast({
        title: "Success",
        description: response.message,
      })
      window.location.href = "/dashboard"
    } else {
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      })
    }
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-5 md:flex-row">
        <Image
          src="/logo-posyandu.png"
          width={1000}
          height={1000}
          alt="Posyandu Marga Agung"
          className="h-32 w-36 rounded-md border"
        />

        <Image
          src="/logo-sgds.png"
          width={1000}
          height={1000}
          alt="Posyandu Marga Agung"
          className="h-32 w-36 rounded-md border"
        />
      </div>

      <Card className="mt-5 w-[320px] border-none">
        <CardContent className="border-none shadow-sm">
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-2">
            <h1 className="text-lg font-semibold">
              Login
              <br />
              Admin & Kader Posyandu
              <br />
              Desa Marga Agung
            </h1>

            <div className="mt-10 flex flex-col items-start justify-center gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                className="h-8"
                id="email"
                name="email"
                type="email"
                required
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                className="h-8"
                id="password"
                name="password"
                type="password"
                required
              />
            </div>

            <div className="mt-5 flex w-full gap-2">
              <div className="flex w-full">
                <Button
                  type="submit"
                  size={"sm"}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
