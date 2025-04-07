"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, LinkIcon, Image, Shield, Pencil } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Component for profile page navigation items
function ProfileNavItem({ icon, label, active = false, onClick = () => {} }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-3 w-full rounded-md transition-colors ${
          active ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600" : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    </li>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Account")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
        {/* Left column - Profile info and navigation */}
        <motion.div className="bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 border-2 border-gray-200">
                <AvatarImage src="/placeholder-user.jpg" alt="Sanjay Beri" />
                <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">SB</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">Sanjay Beri</h2>
            <p className="text-gray-500 text-sm">Super admin</p>
          </div>

          <nav className="mt-6">
            <ul className="space-y-1">
              <ProfileNavItem
                icon={<User size={18} />}
                label="Account"
                active={activeTab === "Account"}
                onClick={() => setActiveTab("Account")}
              />
              <ProfileNavItem
                icon={<LinkIcon size={18} />}
                label="API & Integations"
                active={activeTab === "API & Integations"}
                onClick={() => setActiveTab("API & Integations")}
              />
              <ProfileNavItem
                icon={<Image size={18} />}
                label="Logos"
                active={activeTab === "Logos"}
                onClick={() => setActiveTab("Logos")}
              />
              <ProfileNavItem
                icon={<Shield size={18} />}
                label="MFA"
                active={activeTab === "MFA"}
                onClick={() => setActiveTab("MFA")}
              />
            </ul>
          </nav>
        </motion.div>

        {/* Right column - Account settings */}
        <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-8">Account Setting</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input value="sanjay@thesmartbridge.com" className="border-gray-300" readOnly />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Input type="password" value="password123" className="border-gray-300" readOnly />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mobile</label>
              <Input value="9979409958" className="border-gray-300" readOnly />
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button variant="outline" className="px-6">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 px-6">Save</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

