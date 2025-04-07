"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [timeLeft, setTimeLeft] = useState(60)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Handle OTP input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only allow one digit
    if (value.length > 1) return

    // Update OTP array
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle input focus
  const handleFocus = (index: number) => {
    setFocusedIndex(index)
  }

  // Handle input blur
  const handleBlur = () => {
    setFocusedIndex(null)
  }

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  // Handle resend OTP
  const handleResendOTP = () => {
    // Reset the timer
    setTimeLeft(60);
    // Here you would call your API to resend the OTP
    // For now, we're just resetting the timer
  };

  // Format time as m:ss
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <Link
            href="/forgot-password"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            <span>Back</span>
          </Link>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-10">
          <Image
                       src={"/tenant/Logo.png"}
                       width={48}
                       height={48}
                       alt="Logo"
                       className="object-cover"
                       />
          </div>

          <h1 className="text-3xl font-bold mb-3">Verify OTP</h1>
          <p className="text-gray-500 text-center">
            We have sent you a One Time Password on
            <br />
            <span className="text-black font-medium">sandeep@thesmartbridge.com</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between gap-2">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-full">
                  <Input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                    className="text-center text-xl py-6 h-16"
                    placeholder={focusedIndex === index ? "" : "-"}
                  />
                </div>
              ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-gray-500">
              {timeLeft > 0 ? (
                formatTime()
              ) : (
                <div>
                    <span> Didn&apos;t get the code? </span>
                <button 
                  onClick={handleResendOTP}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                 Resend
                </button>
                    </div>
              )}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6">Verify OTP</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

