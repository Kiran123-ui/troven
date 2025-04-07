"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SponsorsPage() {
  const [activeTab, setActiveTab] = useState("Sponsor")

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

  const sponsors = [
    { id: 1, name: "Smartinternz", website: "smartinternz.com" },
    { id: 2, name: "Smartinternz", website: "smartinternz.com" },
    { id: 3, name: "Smartinternz", website: "smartinternz.com" },
    { id: 4, name: "Smartinternz", website: "smartinternz.com" },
  ]

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="flex justify-between items-center mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold">Sponsors</h1>
        <div className="flex gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Sponsor
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input className="pl-10 w-64 border-gray-300" placeholder="Search Sponsor" />
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
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Website</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor, index) => (
              <motion.tr
                key={sponsor.id}
                variants={itemVariants}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-500">{sponsor.id}</td>
                <td className="px-4 py-3">
                  <div className="h-10 w-10 border border-gray-200 rounded flex items-center justify-center bg-gray-50">
                    <span className="text-xs text-gray-500">
                      Smart
                      <br />
                      internz
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{sponsor.name}</td>
                <td className="px-4 py-3 text-sm">
                  <a href={`https://${sponsor.website}`} className="text-blue-600 hover:underline">
                    {sponsor.website}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full p-0 h-8 w-8 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full p-0 h-8 w-8 flex items-center justify-center text-white bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}

