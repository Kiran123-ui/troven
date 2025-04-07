"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { User, LinkIcon, Image, Shield, Pencil, Cloud, CreditCard } from "lucide-react"
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
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedLogo(URL.createObjectURL(file))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedLogo(URL.createObjectURL(file))
    }
  }

  // Render the appropriate content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Account":
        return (
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
        )
      case "API & Integations":
        return (
          <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-8">API & Integrations</h2>
            <p className="text-gray-500">Manage your API keys and third-party integrations.</p>
          </motion.div>
        )
      case "Logos":
        return (
          <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Logo Setting</h2>
              <div className="flex gap-3">
                <Button variant="outline" className="px-6 rounded-full">Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-full">Save</Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-12">
              <div
                className="border-2 border-dashed border-gray-300 p-6 rounded-md flex flex-col items-center justify-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {selectedLogo ? (
                  <img src={selectedLogo} alt="Selected Logo" className="h-24 w-24 object-contain mb-4" />
                ) : (
                  <p className="text-gray-500">Drag and drop a logo here, or click to select a file</p>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Logo
                </Button>
              </div>
            </div>
          </motion.div>
        )
      case "MFA":
        return (
          <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">MFA Setting</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-full">Enable MFA</Button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-8">
              {/* Add your MFA content here */}
            </div>
          </motion.div>
        )
      case "Subscription":
        return (
          <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-8">Subscription</h2>
            
            {/* Premium Section */}
            <div className="mb-12">
              {/* Add your subscription header content here */}
            </div>

            {/* Credits Section */}
            <div className="mb-8">
              {/* Add your credits content here */}
            </div>

            {/* Add-ons Section */}
            <div className="mb-8">
              {/* Add your add-ons content here */}
            </div>

            {/* Payments Table */}
            <div>
              {/* Add your payments table content here */}
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
        {/* Left column - Profile info and navigation */}
        <motion.div className="bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
          <div className="flex flex-col items-center mb-6 relative">
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
              <ProfileNavItem
                icon={<CreditCard size={18} />}
                label="Subscription"
                active={activeTab === "Subscription"}
                onClick={() => setActiveTab("Subscription")}
              />
            </ul>
          </nav>
        </motion.div>

        {/* Right column - Content based on selected tab */}
        {renderContent()}
      </motion.div>
    </motion.div>
  )
}

