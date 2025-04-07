"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { toast } from 'sonner'

type PasswordFormValues = {
  password: string;
  confirmPassword: string;
}

export default function SetPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<PasswordFormValues>({
    mode: "onChange"
  });

  const password = watch("password", "");

  const hasMinLength = password.length >= 5;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasCapital = /[A-Z]/.test(password);

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/student/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          token
        })
      })

      if (!response.ok) throw new Error('Failed to set password')

      toast.success('Password set successfully')
      router.push('/student/login')
    } catch (error) {
      toast.error('Failed to set password')
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-10">
          <Link href="/login" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base">
            <ArrowLeft size={18} className="mr-2" />
            <span>Back to Sign in</span>
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

          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Set Password</h1>
          <p className="text-gray-500 text-center">
            Craft a Robust Password to Safeguard Your
            <br />
            Account - A Gentle Reminder
          </p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <Input
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters"
                  },
                  validate: {
                    hasSpecial: v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || "Must contain special characters",
                    hasNumber: v => /\d/.test(v) || "Must contain a number",
                    hasCapital: v => /[A-Z]/.test(v) || "Must contain a capital letter"
                  }
                })}
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                className={`pl-10 py-4 sm:py-6 text-sm sm:text-base ${errors.password ? "border-red-500" : ""}`}
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
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
              </div>
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="relative">
              <Input
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`pl-10 py-4 sm:py-6 text-sm sm:text-base ${errors.confirmPassword ? "border-red-500" : ""}`}
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
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
              </div>
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div className="space-y-2 mt-4 text-sm sm:text-base">
              <div className="flex items-center">
                {hasMinLength ? (
                  <Check size={16} className="text-green-500 mr-2" />
                ) : (
                  <X size={16} className="text-red-500 mr-2" />
                )}
                <span className={hasMinLength ? "text-green-500" : "text-red-500"}>
                  Password has at least 5 characters
                </span>
              </div>

              <div className="flex items-center">
                {hasSpecialChar ? (
                  <Check size={16} className="text-green-500 mr-2" />
                ) : (
                  <X size={16} className="text-red-500 mr-2" />
                )}
                <span className={hasSpecialChar ? "text-green-500" : "text-red-500"}>
                  Password has special characters
                </span>
              </div>

              <div className="flex items-center">
                {hasNumber ? (
                  <Check size={16} className="text-green-500 mr-2" />
                ) : (
                  <X size={16} className="text-red-500 mr-2" />
                )}
                <span className={hasNumber ? "text-green-500" : "text-red-500"}>Password has a number</span>
              </div>

              <div className="flex items-center">
                {hasCapital ? (
                  <Check size={16} className="text-green-500 mr-2" />
                ) : (
                  <X size={16} className="text-red-500 mr-2" />
                )}
                <span className={hasCapital ? "text-green-500" : "text-red-500"}>Password has a capital letter</span>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button 
                type="submit"
                className="w-full py-4 sm:py-6 text-sm sm:text-base bg-blue-600 hover:bg-blue-700"
                disabled={!isValid || !hasMinLength || !hasSpecialChar || !hasNumber || !hasCapital || isLoading}
              >
                {isLoading ? "Setting Password..." : "Set Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

