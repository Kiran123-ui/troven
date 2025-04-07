import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <div className="w-12 h-12 mb-6">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                <path
                  d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 7.5c6.904 0 12.5 5.596 12.5 12.5 0 6.904-5.596 12.5-12.5 12.5-6.904 0-12.5-5.596-12.5-12.5 0-6.904 5.596-12.5 12.5-12.5zm0 5c-4.142 0-7.5 3.358-7.5 7.5 0 4.142 3.358 7.5 7.5 7.5 4.142 0 7.5-3.358 7.5-7.5 0-4.142-3.358-7.5-7.5-7.5z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Again!</h1>
            <p className="text-gray-500">Sign in to your Troven account</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input 
                type="email" 
                placeholder="Your Email" 
                className="pl-10 py-6"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>

            <div className="relative">
              <Input 
                type="password" 
                placeholder="Enter Password" 
                className="pl-10 py-6"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                <Eye size={18} />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link href="#" className="text-gray-500 text-sm hover:text-gray-700">
                Forgot your password?
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                Sign In
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <Button variant="outline" className="w-full py-6 border-gray-300">
              Signup For Free
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-blue-600 p-8 md:p-16 flex flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] mx-auto mb-16">
          {/* Spiral/Pinwheel design with images */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200 border-[12px] border-blue-600">
            <Image src="/placeholder.svg?height=160&width=160" width={160} height={160} alt="Person working" className="object-cover" />
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/4 right-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200 border-[12px] border-blue-600">
            <Image src="/placeholder.svg?height=160&width=160" width={160} height={160} alt="Person working" className="object-cover" />
          </div>
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200 border-[12px] border-blue-600">
            <Image src="/placeholder.svg?height=160&width=160" width={160} height={160} alt="Person working" className="object-cover" />
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/4 left-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200 border-[12px] border-blue-600">
            <Image src="/placeholder.svg?height=160&width=160" width={160} height={160} alt="Person working" className="object-cover" />
          </div>
          
          {/* Blue spiral overlay */}
          <div className="absolute inset-0 z-10">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M200 0C200 110.457 110.457 200 0 200C110.457 200 200 289.543 200 400C200 289.543 289.543 200 400 200C289.543 200 200 110.457 200 0Z" fill="#1d4ed8" />
            </svg>
          </div>
        </div>

        <div className="text-center max-w-md">
          <h2 className="text-4xl font-bold mb-2">Effortless</h2>
          <h2 className="text-4xl font-bold mb-8">Management With Troven</h2>
          <div className="w-24 h-0.5 bg-white/30 mx-auto mb-8"></div>
          <p className="text-sm md:text-base text-white/90 px-4">
            Embrace the digital transformation that simplifies assessment creation, optimizes
            distribution, and provides real-time analytics for informed decision-making.
          </p>
        </div>
      </div>
    </div>
  );
}

