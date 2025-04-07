"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Pencil, Trash2, FileUp, Eye, ChevronLeft, ChevronRight, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InstitutionDetailPage({ params }: { params: { id: string } }) {
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false)

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

  // Sample data for students
  const students = [
    {
      id: 1,
      name: "Sanjay Beri",
      email: "sanjay@thesmartbridge.com",
      mobile: "99794 09958",
      status: "Active",
    },
    // ...existing student data...
  ]

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Institution Header */}
      <motion.div
        className="bg-white rounded-md border border-gray-200 p-6 mb-6 flex items-center justify-between"
        variants={itemVariants}
      >
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 bg-gray-100 rounded-md overflow-hidden">
            <img src="/placeholder.svg?height=80&width=80" alt="IIT Kharagpur" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold">IIT Kharagpur</h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-500">By Sanjay Beri</span>
              <span className="text-sm">10 Students</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
            >
              <Pencil className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileUp className="w-4 h-4 mr-2" />
              Import students
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddStudentDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Students List */}
      <motion.div className="bg-white rounded-md border border-gray-200" variants={itemVariants}>
        {/* Search Header */}
        <div className="p-6 pb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Students <span className="text-gray-500">(15)</span>
          </h3>
          <div className="relative w-64">
            <Input placeholder="Search Students" className="pl-10 border-gray-300" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          {/* ...existing table code... */}
        </div>

        {/* Pagination */}
        <div className="p-4 flex justify-end items-center">
          {/* ...existing pagination code... */}
        </div>
      </motion.div>

      {/* Add Student Dialog */}
      {showAddStudentDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-md w-full max-w-md"
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-6 pb-4">
              <h2 className="text-xl font-semibold">Add Student</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100"
                onClick={() => setShowAddStudentDialog(false)}
              >
                <X className="h-5 w-5 text-red-500" />
              </Button>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <div>
                <Input placeholder="Name" className="border-gray-300 h-12" />
              </div>

              <div>
                <Input placeholder="Email" type="email" className="border-gray-300 h-12" />
              </div>

              <div>
                <Input placeholder="Mobile" className="border-gray-300 h-12" />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 pt-4 border-t border-gray-200 mt-4">
              <Button variant="outline" className="px-6 rounded-md" onClick={() => setShowAddStudentDialog(false)}>
                Cancel
              </Button>
              <Button className="px-6 bg-blue-600 hover:bg-blue-700 rounded-md">Add</Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
