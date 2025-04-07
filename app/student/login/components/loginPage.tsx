'use client'
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye, ArrowLeft, Smartphone, Mail, Key } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function LoginPage() {
  const [authStep, setAuthStep] = useState<"credentials" | "mfa">("credentials")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [selectedMfaMethod, setSelectedMfaMethod] = useState<"app" | "sms" | "email">("app")

  const handleMfaCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)
      
      // Auto-focus next input if value is entered
      if (value && index < 5) {
        const nextInput = document.getElementById(`mfa-code-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleSignIn = () => {
    // Here you would normally validate credentials
    setAuthStep("mfa")
  }

  const handleVerifyMfa = () => {
    // Here you would verify the MFA code
    console.log("Verifying MFA code:", verificationCode.join(""))
    // Proceed to authenticated state or show error
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-6 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-12">
            <div className="w-14 h-14 mb-8">
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
                  <h1 className="text-3xl font-bold mb-3 text-gray-800">Welcome Again!</h1>
                  <p className="text-gray-500">Sign in to your Troven account</p>
                </motion.div>
              ) : (
                <motion.div
                  key="mfa"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-3xl font-bold mb-3 text-gray-800">Verify Your Identity</h1>
                  <p className="text-gray-500">Enter the verification code to continue</p>
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
                className="space-y-5"
              >
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    className="pl-10 py-6 rounded-lg shadow-sm border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                </div>

                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter Password" 
                    className="pl-10 py-6 rounded-lg shadow-sm border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                </div>

                <div className="flex justify-between items-center pt-3">
                  <Link href="#" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">
                    Forgot your password?
                  </Link>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all" 
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mfaForm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* MFA Method Selection */}
                <div className="flex justify-center space-x-5 mb-8">
                  <div 
                    className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all shadow-sm
                      ${selectedMfaMethod === 'app' 
                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setSelectedMfaMethod('app')}
                  >
                    <Key size={24} className="mb-2" />
                    <span className="text-xs font-medium">Auth App</span>
                  </div>
                  <div 
                    className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all shadow-sm
                      ${selectedMfaMethod === 'sms' 
                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setSelectedMfaMethod('sms')}
                  >
                    <Smartphone size={24} className="mb-2" />
                    <span className="text-xs font-medium">SMS</span>
                  </div>
                  <div 
                    className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all shadow-sm
                      ${selectedMfaMethod === 'email' 
                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setSelectedMfaMethod('email')}
                  >
                    <Mail size={24} className="mb-2" />
                    <span className="text-xs font-medium">Email</span>
                  </div>
                </div>
                
                {/* Verification Code Input */}
                <div className="flex justify-between space-x-3 px-4">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`mfa-code-${index}`}
                      className="w-12 h-14 text-center text-xl font-semibold p-0 rounded-lg shadow-sm border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      value={digit}
                      onChange={(e) => handleMfaCodeChange(index, e.target.value)}
                      maxLength={1}
                      pattern="[0-9]*"
                      inputMode="numeric"
                    />
                  ))}
                </div>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  {selectedMfaMethod === 'app' && 'Enter the code from your authenticator app'}
                  {selectedMfaMethod === 'sms' && 'We sent a code to your phone (***) ***-7890'}
                  {selectedMfaMethod === 'email' && `We sent a code to ${email.slice(0, 3)}...${email.slice(email.indexOf('@'))}`}
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <Button 
                    variant="ghost" 
                    className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    onClick={() => setAuthStep("credentials")}
                  >
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                    onClick={handleVerifyMfa}
                  >
                    Verify
                  </Button>
                </div>
                
                <div className="text-center mt-6">
                  <button className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors">
                    Didn't receive a code? Resend
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {authStep === "credentials" && (
            <div className="mt-10">
              <Button 
                variant="outline" 
                className="w-full py-6 border-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all"
                onClick={()=>window.location.href="/tenant/signup"}
              >
                <span className="text-blue-600 font-medium">
                Signup For Free
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-blue-600 flex flex-col justify-center items-center text-white relative overflow-hidden">
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

