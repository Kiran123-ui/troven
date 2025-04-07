"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Info, Edit, Trash2, ToggleLeft, X, Upload, Eye, EyeOff, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UserManagement() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("User management")
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
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

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setSelectedRow(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const users = [
    {
      id: 1,
      name: "Sanjay Beri",
      email: "sanjay@thesmartbridge.com",
      role: "Super Admin",
      assessments: "15 Created",
      status: "Onboarded",
    },
    {
      id: 2,
      name: "Sanjay Beri",
      email: "sanjay@thesmartbridge.com",
      role: "Super Admin",
      assessments: "15 Created",
      status: "Onboarded",
    },
    {
      id: 3,
      name: "Sanjay Beri",
      email: "sanjay@thesmartbridge.com",
      role: "Super Admin",
      assessments: "15 Created",
      status: "Onboarded",
    },
    {
      id: 4,
      name: "Sanjay Beri",
      email: "sanjay@thesmartbridge.com",
      role: "Super Admin",
      assessments: "15 Created",
      status: "Invited",
    },
  ]

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="flex justify-between items-center mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddUserDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input className="pl-10 w-64 border-gray-300" placeholder="Search User" />
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200"
      >
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">DP</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Role</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Assessments</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                variants={itemVariants}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-500">{user.id}</td>
                <td className="px-4 py-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-800">SB</AvatarFallback>
                  </Avatar>
                </td>
                <td className="px-4 py-3 text-sm">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
                <td className="px-4 py-3 text-sm">{user.role}</td>
                <td className="px-4 py-3 text-sm">{user.assessments}</td>
                <td className="px-4 py-3 text-sm">{user.status}</td>
                <td className="px-4 py-3 text-sm relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-0 h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                    onClick={() => {
                      setSelectedRow(user.id)
                      setIsDropdownOpen(true)
                    }}
                  >
                    <Info className="h-5 w-5" />
                  </Button>

                  {selectedRow === user.id && isDropdownOpen && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden w-48 py-1"
                    >
                      <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <span className="text-sm">Disable</span>
                        <ToggleLeft className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <span className="text-sm">Edit</span>
                        <Edit className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <span className="text-sm">Delete</span>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </div>
                    </motion.div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Add User Dialog */}
      <AnimatePresence>
        {showAddUserDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-md w-full max-w-md"
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between p-6 pb-4">
                <h2 className="text-xl font-semibold">Create User</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={() => setShowAddUserDialog(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 pt-2 space-y-4">
                <div>
                  <Input placeholder="Name" className="border-gray-300 h-12" />
                </div>

                <div>
                  <Input placeholder="Mobile Number" className="border-gray-300 h-12" />
                </div>

                <div>
                  <Input placeholder="Email address" type="email" className="border-gray-300 h-12" />
                </div>

                <div className="relative">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className="border-gray-300 h-12 pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>

                <div className="relative">
                  <div className="border border-gray-300 rounded-md h-12 flex items-center justify-between px-4">
                    <span className="text-gray-500">Role</span>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div
                    className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <div className="text-blue-600 mb-2">
                      <Upload className="h-6 w-6 mx-auto" />
                    </div>
                    <p className="text-sm font-medium text-center">Upload Profile Picture</p>
                    <p className="text-xs text-gray-500 text-center">Drag or Drop</p>
                  </div>

                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    {selectedImage ? (
                      <div className="relative h-full">
                        <img
                          src={selectedImage || "/placeholder.svg"}
                          alt="Selected profile"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 bg-white rounded-full"
                          onClick={() => setSelectedImage(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <img
                        src="/placeholder.svg?height=100&width=150"
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 pt-4">
                <Button variant="outline" className="px-6" onClick={() => setShowAddUserDialog(false)}>
                  Cancel
                </Button>
                <Button className="px-6 bg-blue-600 hover:bg-blue-700">Create</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

