"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import Image from "next/image"

type SignupFormValues = {
  name: string;
  companyName: string;
  subDomain: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<SignupFormValues>({
    mode: "onChange"
  });

  const password = watch("password");

  const onSubmit = (data: SignupFormValues) => {
    console.log("Form submitted:", data);
    // Handle signup API call
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-md mx-auto w-full">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6">
            <Image
              src={"/tenant/Logo.png"}
              width={48}
              height={48}
              alt="Logo"
              className="object-cover"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Get started for free</h1>
          <p className="text-gray-500 text-sm sm:text-base text-center">Elevate your assessment game</p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input 
              {...register("name", { required: "Name is required" })}
              type="text" 
              placeholder="Name" 
              className={`py-4 sm:py-6 text-sm sm:text-base ${errors.name ? "border-red-500" : ""}`} 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}

            <Input 
              {...register("companyName", { required: "Company name is required" })}
              type="text" 
              placeholder="Company Name" 
              className={`py-4 sm:py-6 text-sm sm:text-base ${errors.companyName ? "border-red-500" : ""}`}
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}

            <Input 
              {...register("subDomain", { required: "Sub domain is required" })}
              type="text" 
              placeholder="Sub Domain" 
              className={`py-4 sm:py-6 text-sm sm:text-base ${errors.subDomain ? "border-red-500" : ""}`}
            />
            {errors.subDomain && <p className="text-red-500 text-xs mt-1">{errors.subDomain.message}</p>}

            <Input 
              {...register("mobile", { 
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number"
                }
              })}
              type="tel" 
              placeholder="Mobile Number" 
              className={`py-4 sm:py-6 text-sm sm:text-base ${errors.mobile ? "border-red-500" : ""}`}
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}

            <Input 
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email" 
              placeholder="Corporate Email Address" 
              className={`py-4 sm:py-6 text-sm sm:text-base ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

            <div className="relative">
              <Input 
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
                type={showPassword ? "text" : "password"} 
                placeholder="Set Password" 
                className={`py-4 sm:py-6 text-sm sm:text-base ${errors.password ? "border-red-500" : ""}`}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                className={`py-4 sm:py-6 text-sm sm:text-base ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div className="pt-2 sm:pt-4">
              <Button 
                type="submit" 
                className="w-full py-4 sm:py-6 text-sm sm:text-base"
                disabled={!isValid}
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

