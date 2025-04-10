"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  ListFilter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  BarChart2,
  Percent,
  X,
  Cloud,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function WorkspacePage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(3)
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false)
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  }

  // Stats data
  const stats = [
    {
      id: 1,
      title: "Total Assessments",
      value: "305",
      icon: <ListFilter className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      title: "Total Students Invited",
      value: "4502",
      icon: <Megaphone className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "Total Students Attempted",
      value: "2540",
      icon: <BarChart2 className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      id: 4,
      title: "Total Qualified",
      value: "40%",
      icon: <Percent className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-50",
    },
  ]

  // Workspace data
  const workspaces = [
    {
      id: 1,
      title: "Google Backend - Python Team",
      creator: "Sanjay Beri",
      assessments: 10,
      date: "Aug 03 2023",
      progress: 60,
      image: "/placeholder.svg?height=150&width=200&text=Python",
    },
    {
      id: 2,
      title: "Google Backend - Python Team",
      creator: "Sanjay Beri",
      assessments: 10,
      date: "Aug 03 2023",
      progress: 75,
      image: "/placeholder.svg?height=150&width=200&text=Backend",
    },
    {
      id: 3,
      title: "Google Backend - Python Team",
      creator: "Sanjay Beri",
      assessments: 10,
      date: "Aug 03 2023",
      progress: 45,
      image: "/placeholder.svg?height=150&width=200&text=AI",
    },
    {
      id: 4,
      title: "Google Backend - Python Team",
      creator: "Sanjay Beri",
      assessments: 10,
      date: "Aug 03 2023",
      progress: 80,
      image: "/placeholder.svg?height=150&width=200&text=Robot",
    },
    {
      id: 5,
      title: "Google Backend - Python Team",
      creator: "Sanjay Beri",
      assessments: 10,
      date: "Aug 03 2023",
      progress: 55,
      image: "/placeholder.svg?height=150&width=200&text=VR",
    },
    {
      id: 6,
      title: "Google Backend - Python Team",
      creator: "Sanjay Beri",
      assessments: 10,
      date: "Aug 03 2023",
      progress: 70,
      image: "/placeholder.svg?height=150&width=200&text=Satellite",
    },
    {
      id: 7,
      title: "Google Backend - Python Team",
      creator: "Sanjay Beri",
      assessments: 10,
      date: "Aug 03 2023",
      progress: 50,
      image: "/placeholder.svg?height=150&width=200&text=Coding",
    },
    {
      id: 8,
      title: "Google Backend - Python Team",
      creator: "Sanjay Beri",
      assessments: 10,
      date: "Aug 03 2023",
      progress: 65,
      image: "/placeholder.svg?height=150&width=200&text=VR",
    },
  ]

  // Handle workspace card click
  const handleWorkspaceClick = (workspaceId: number) => {
    router.push(`/tenant/dashboard/workspace/${workspaceId}`);
  };
  
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

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-white p-6 rounded-md border border-gray-200"
        variants={containerVariants}
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} className="flex items-center gap-4" variants={itemVariants}>
            <div className={`${stat.bgColor} p-3 rounded-md`}>{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Workspace Header and Filters */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Workspace</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNewWorkspaceModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Workspace
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-gray-600">Filters By</span>

          <div className="relative">
            <div className="flex items-center justify-between border border-gray-300 rounded-md h-10 px-4 bg-white min-w-[180px]">
              <span className="text-gray-500">Skills</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between border border-gray-300 rounded-md h-10 px-4 bg-white min-w-[180px]">
              <span className="text-gray-500">Role</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between border border-gray-300 rounded-md h-10 px-4 bg-white min-w-[180px]">
              <span className="text-gray-500">Created by</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Workspace Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
        {workspaces.map((workspace) => (
          <motion.div
            key={workspace.id}
            className="bg-white rounded-md border border-gray-200 overflow-hidden cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleWorkspaceClick(workspace.id)}
          >
            <div className="flex">
              <div className="h-[120px] w-[120px] bg-gray-100 relative">
                <img
                  src={workspace.image || "/placeholder.svg"}
                  alt={workspace.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <h3 className="font-semibold text-lg">{workspace.title}</h3>
                <div className="text-sm text-gray-500 mt-1">By {workspace.creator}</div>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm">{workspace.assessments} Assessment</div>
                  <div className="text-sm text-gray-500">{workspace.date}</div>
                </div>
                <div className="mt-3 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${workspace.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant="ghost"
              size="sm"
              className={`h-8 w-8 ${page === currentPage ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700"}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* New Workspace Modal */}
      {showNewWorkspaceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md w-full max-w-lg">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Create new Workspace</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100"
                onClick={() => {
                  setShowNewWorkspaceModal(false)
                  setSelectedImage(null)
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Input placeholder="Name" className="border-gray-300 h-12" />
              </div>

              <div>
                <Textarea placeholder="Description" className="border-gray-300 min-h-[120px] resize-none" />
              </div>

              <div className="flex gap-4 mt-6">
                <div
                  className="border border-dashed border-gray-300 rounded-md p-6 flex-1 flex flex-col items-center justify-center cursor-pointer"
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
                  <div className="text-blue-600 mb-3">
                    <Cloud className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-base font-medium text-center mb-1">Upload Thumbnail Picture</p>
                  <p className="text-sm text-gray-500 text-center">Drag or Drop</p>
                </div>

                {selectedImage && (
                  <div className="w-1/3 relative">
                    <img
                      src={selectedImage}
                      alt="Selected thumbnail"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 bg-white rounded-full shadow-md"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 pt-4 border-t border-gray-200">
              <Button variant="default">Create Workspace</Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowNewWorkspaceModal(false)
                  setSelectedImage(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
