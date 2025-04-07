'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"

type ForgotPasswordFormValues = {
  email: string;
}

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgotPasswordFormValues>({
    mode: "onChange"
  });

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true)
      // Call your API here
      const response = await fetch('/api/student/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to send OTP')

      router.push('/student/verify-otp')
    } catch (error) {
      console.error('Forgot password error:', error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-6 sm:mb-10">
          <Link href="/login" className="flex items-center text-blue-600">
            <ArrowLeft size={16} className="sm:size-18 mr-2" />
            <span className="text-sm sm:text-base">Back to Sign in</span>
          </Link>
        </div>

        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-16 h-16 mb-10">
            <Image
              src={"/tenant/Logo.png"}
              width={48}
              height={48}
              alt="Logo"
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-center">We will send you a One Time Password on your email address.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <div className="relative">
            <Input 
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email" 
              placeholder="Your Email" 
              className={`pl-10 py-4 sm:py-6 text-sm sm:text-base ${errors.email ? "border-red-500" : ""}`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <Button 
            type="submit"
            className="w-full py-4 sm:py-6 text-sm sm:text-base"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Sending..." : "Get OTP"}
          </Button>
        </form>
      </div>
    </div>
  )
}

