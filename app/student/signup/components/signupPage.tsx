"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-6">
          <Image
                       src={"/tenant/Logo.png"}
                       width={48}
                       height={48}
                       alt="Logo"
                       className="object-cover"
                       />
          </div>

          <h1 className="text-3xl font-bold mb-2">Get started for free</h1>
          <p className="text-gray-500">Elevate your assessment game</p>
        </div>

        <div className="space-y-4">
          <Input type="text" placeholder="Name" className="py-6" />

          <Input type="text" placeholder="Company Name" className="py-6" />

          <Input type="text" placeholder="Sub Domain" className="py-6" />

          <Input type="tel" placeholder="Mobile Number" className="py-6" />

          <Input type="email" placeholder="Corporate Email Address" className="py-6" />

          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Set Password" className="py-6" />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div className="relative">
            <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="py-6" />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6">Sign up</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

