"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, ListFilter, GraduationCapIcon as GraduationCap2, UserCheck, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function StudentManagementPage() {
  const [activeTab, setActiveTab] = useState("Student management")
  const router = useRouter()

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

  const handleCardClick = (id: number) => {
    router.push(`/tenant/dashboard/student-management/${id}`)
  }

  // Stats data
  const stats = [
    { id: 1, title: "Total Batches", value: "305", icon: <ListFilter className="h-5 w-5 text-blue-600" /> },
    { id: 2, title: "Total Students", value: "4502", icon: <GraduationCap2 className="h-5 w-5 text-blue-600" /> },
    { id: 3, title: "Total Students Attempted", value: "2540", icon: <UserCheck className="h-5 w-5 text-blue-600" /> },
    { id: 4, title: "Total Qualified", value: "40%", icon: <Percent className="h-5 w-5 text-blue-600" /> },
  ]

  // Sample data for institutions
  const institutions = [
    { id: 1, name: "IIT Kharagpur", image: "/placeholder.svg?height=150&width=300", creator: "Sanjay Beri", students: 10 },
    { id: 2, name: "IIT Kharagpur", image: "/placeholder.svg?height=150&width=300", creator: "Sanjay Beri", students: 10 },
    { id: 3, name: "IIT Kharagpur", image: "/placeholder.svg?height=150&width=300", creator: "Sanjay Beri", students: 10 },
    { id: 4, name: "IIT Kharagpur", image: "/placeholder.svg?height=150&width=300", creator: "Sanjay Beri", students: 10 },
    { id: 5, name: "IIT Kharagpur", image: "/placeholder.svg?height=150&width=300", creator: "Sanjay Beri", students: 10 },
    { id: 6, name: "IIT Kharagpur", image: "/placeholder.svg?height=150&width=300", creator: "Sanjay Beri", students: 10 },
    { id: 7, name: "IIT Kharagpur", image: "/placeholder.svg?height=150&width=300", creator: "Sanjay Beri", students: 10 },
    { id: 8, name: "IIT Kharagpur", image: "/placeholder.svg?height=150&width=300", creator: "Sanjay Beri", students: 10 },
    { id: 9, name: "IIT Kharagpur", image: "/placeholder.svg?height=150&width=300", creator: "Sanjay Beri", students: 10 },
  ]

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="flex justify-between items-center mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold">Student Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Batch
        </Button>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-white p-6 rounded-md border border-gray-200"
        variants={containerVariants}
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} className="flex items-center gap-4" variants={itemVariants}>
            <div className="bg-blue-50 p-3 rounded-md">{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Institutions Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
        {institutions.map((institution) => (
          <motion.div
            key={institution.id}
            className="bg-white rounded-md border border-gray-200 overflow-hidden cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleCardClick(institution.id)}
          >
            <div className="h-40 bg-gray-100 relative">
              <img
                src={institution.image || "/placeholder.svg"}
                alt={institution.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{institution.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-500">By {institution.creator}</div>
                <div className="text-sm font-medium">{institution.students} Students</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
