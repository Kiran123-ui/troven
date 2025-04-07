'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Key, Smartphone, Mail, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

type MfaMethod = "app" | "sms" | "email"

interface MfaFormProps {
  email: string
  onBack: () => void
  onVerify: (code: string, method: MfaMethod) => void
}

export default function MfaForm({ email, onBack, onVerify }: MfaFormProps) {
  const [selectedMfaMethod, setSelectedMfaMethod] = useState<MfaMethod>("app")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const { handleSubmit } = useForm({
    mode: "onChange"
  })

  const onSubmit = () => {
    const code = verificationCode.join("")
    if (code.length === 6) {
      onVerify(code, selectedMfaMethod)
    }
  }

  const handleMfaCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)
      
      if (value && index < 5) {
        inputRefs[index + 1].current?.focus()
      } else if (value === "" && index > 0) {
        inputRefs[index - 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current?.focus()
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()
    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const newCode = [...verificationCode]
      for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
        newCode[i] = pastedData[i]
      }
      setVerificationCode(newCode)
      
      if (pastedData.length < 6) {
        inputRefs[pastedData.length].current?.focus()
      } else {
        inputRefs[5].current?.focus()
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
              ref={inputRefs[index]}
              id={`mfa-code-${index}`}
              className="w-12 h-14 text-center text-xl font-semibold p-0 rounded-lg shadow-sm border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={digit}
              onChange={(e) => handleMfaCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              maxLength={1}
              pattern="[0-9]*"
              inputMode="numeric"
              autoComplete="one-time-code"
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
            type="button"
            variant="ghost" 
            className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={onBack}
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            disabled={verificationCode.some(digit => !digit)}
          >
            Verify
          </Button>
        </div>
        
        <div className="text-center mt-6">
          <button 
            type="button"
            className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors"
          >
            Didn't receive a code? Resend
          </button>
        </div>
      </form>
    </motion.div>
  )
}
