'use client'
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import MfaForm from "@/components/auth/MfaForm"

type LoginFormValues = {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [authStep, setAuthStep] = useState<"credentials" | "mfa">("credentials")
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const emailValue = watch("email")

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login form submitted:", data)
    setAuthStep("mfa")
  }

  const handleVerifyMfa = (code: string, method: string) => {
    console.log(`Verifying MFA code: ${code} with method: ${method}`)
    // Here you would handle API call for MFA verification
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section - Full width on mobile */}
      <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-12 lg:p-24 flex flex-col justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8 lg:mb-12">
            <div className="w-12 h-12 lg:w-14 lg:h-14 mb-6 lg:mb-8">
              <Image
                src={"/tenant/Logo.png"}
                width={56}
                height={56}
                alt="Logo"
                className="object-cover"
              />
            </div>
            <AnimatePresence mode="wait">
              {authStep === "credentials" ? (
                <motion.div
                  key="credentials"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-gray-800">Welcome Admin!</h1>
                  <p className="text-gray-500 text-sm sm:text-base">Sign in to manage your platform</p>
                </motion.div>
              ) : (
                <motion.div
                  key="mfa"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-gray-800">Verify Identity</h1>
                  <p className="text-gray-500 text-sm sm:text-base">Enter verification code to continue</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {authStep === "credentials" ? (
              <motion.div
                key="credentialsForm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-5"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative">
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      className={`pl-10 py-4 sm:py-6 text-sm sm:text-base rounded-lg shadow-sm border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all
                        ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}`}
                      {...register("email", { 
                        required: "Email is required", 
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
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
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="relative mt-5">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter Password" 
                      className={`pl-10 py-4 sm:py-6 text-sm sm:text-base rounded-lg shadow-sm border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all
                        ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}`}
                      {...register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        } 
                      })}
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Eye size={18} />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-5">
                    <Link href="/admin/forgot-password" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">
                      Forgot password?
                    </Link>
                    <Button 
                      type="submit"
                      className="px-8 py-4 sm:py-6 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                      disabled={!isValid}
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <MfaForm 
                email={emailValue} 
                onBack={() => setAuthStep("credentials")}
                onVerify={handleVerifyMfa}
                className="space-y-4 sm:space-y-6"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

     {/* Right Section - Hide on mobile, show on lg screens */}
          <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-600 flex-col justify-center items-center text-white relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/tenant/bg_img.png"
                alt="Background"
                fill
                className="object-cover opacity-20"
                priority
              />
            </div>
            
            {/* Blue overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90 opacity-40 z-10"></div>
            
            <div className="relative z-20 p-8 md:p-16 flex flex-col items-center">
              <div className="w-[300px] h-[300px] md:w-[380px] md:h-[380px] mx-auto mb-16">
                <Image
                  src={"/tenant/login_Group.png"}
                  width={380}
                  height={380}
                  alt="Spiral design"
                  className="object-cover"
                />
              </div>
    
              <div className="text-center max-w-3xl">
                <h2 className="text-4xl font-bold mb-2">Effortless</h2>
                <h2 className="text-4xl font-bold mb-8">Management With Troven</h2>
                <div className="w-80 h-0.5 bg-white/40 mx-auto mb-8"></div>
                <p className=" text-base md:text-lg text-white/90 px-4 leading-relaxed">
                  Embrace the digital transformation that simplifies assessment creation, optimizes distribution, and provides
                  real-time analytics for informed decision-making.
                </p>
              </div>
            </div>
          </div>
    </div>
  )
}

