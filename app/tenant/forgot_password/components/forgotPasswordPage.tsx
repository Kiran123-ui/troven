'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"

type ForgotPasswordFormValues = {
  email: string;
}

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgotPasswordFormValues>({
    mode: "onChange"
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Form submitted:", data);
    // Handle forgot password API call
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-6 sm:mb-10">
          <Link href="/login" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={16} className="sm:size-18 mr-2" />
            <span className="text-sm sm:text-base">Back to Sign in</span>
          </Link>
        </div>

        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-6 sm:mb-10">
            <Image
              src={"/tenant/Logo.png"}
              width={48}
              height={48}
              alt="Logo"
              className="object-cover"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Forgot Password</h1>
          <p className="text-gray-500 text-sm sm:text-base text-center">
            We will send you a One Time Password on your email address.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
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
                className={`pl-10 py-6 ${errors.email ? "border-red-500" : ""}`}
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

            <div className="flex justify-end">
              <Button 
                type="submit"
                className="px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base"
                disabled={!isValid}
              >
                Get OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

