import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <Link href="/login" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            <span>Back to Sign in</span>
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

          <h1 className="text-3xl font-bold mb-3">Forgot Password</h1>
          <p className="text-gray-500 text-center">We will send you a One Time Password on your email address.</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Input type="email" placeholder="Your Email" className="pl-10 py-6" />
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

          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6">Get OTP</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

