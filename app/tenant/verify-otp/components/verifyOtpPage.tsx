"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"

type OtpFormValues = {
  otp: string[];
}

export default function VerifyOTPPage() {
  const [timeLeft, setTimeLeft] = useState(60)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<OtpFormValues>({
    mode: "onChange",
    defaultValues: {
      otp: Array(6).fill("")
    }
  });

  const otpValues = watch("otp");

  const onSubmit = async (data: OtpFormValues) => {
    try {
      const code = data.otp.join("");
      console.log("Verifying OTP:", code);
      // Call your API here
      // await verifyOtp(code);
      // Redirect on success
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  // Handle OTP input
  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setValue("otp", newOtp);
      
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
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
  const handleResendOTP = async () => {
    try {
      setTimeLeft(60);
      // Call your resend OTP API here
      // await resendOtp(email);
      console.log("OTP resent successfully");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  // Format time as m:ss
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-10">
          <Link
            href="/forgot-password"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            <span>Back</span>
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

          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Verify OTP</h1>
          <p className="text-gray-500 text-sm sm:text-base text-center">
            We have sent you a One Time Password on
            <br />
            <span className="text-black font-medium">sandeep@thesmartbridge.com</span>
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div className="flex justify-between gap-1 sm:gap-2">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="w-full">
                  <Input
                    {...register(`otp.${index}`, { 
                      required: true,
                      pattern: /^[0-9]$/,
                      validate: value => !value || /^[0-9]$/.test(value) || "Must be a number"
                    })}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={otpValues[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                    className={`text-center text-lg sm:text-xl h-12 sm:h-16 p-2 sm:p-4 ${
                      errors.otp?.[index] ? "border-red-500" : ""
                    }`}
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
              <Button 
                type="submit"
                className="px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base"
                disabled={!isValid || otpValues.some(v => !v)}
              >
                Verify OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

