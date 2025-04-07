"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Edit, Trash2, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SponsorsPage() {
  const [activeTab, setActiveTab] = useState("Sponsor")
  const [showAddSponsorDialog, setShowAddSponsorDialog] = useState(false)
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

  const sponsors = [
    { id: 1, name: "Smartinternz", website: "smartinternz.com" },
    { id: 2, name: "Smartinternz", website: "smartinternz.com" },
    { id: 3, name: "Smartinternz", website: "smartinternz.com" },
    { id: 4, name: "Smartinternz", website: "smartinternz.com" },
  ]

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedLogo(e.target?.result as string)
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
        setSelectedLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="flex justify-between items-center mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold">Sponsors</h1>
        <div className="flex gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddSponsorDialog(true)}>
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

      {/* Add Sponsor Dialog */}
      <AnimatePresence>
        {showAddSponsorDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-md w-full max-w-md"
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between p-6 pb-4">
                <h2 className="text-xl font-semibold">Add Sponsor</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={() => setShowAddSponsorDialog(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 pt-2 space-y-4">
                <div>
                  <Input placeholder="Name" className="border-gray-300 h-12" />
                </div>

                <div>
                  <Input placeholder="Website URL" className="border-gray-300 h-12" />
                </div>

                <div>
                  <Textarea placeholder="Description" className="border-gray-300 min-h-[120px] resize-none" />
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
                      onChange={handleLogoUpload}
                    />
                    <div className="text-blue-600 mb-2">
                      <Upload className="h-6 w-6 mx-auto" />
                    </div>
                    <p className="text-sm font-medium text-center">Upload Logo</p>
                    <p className="text-xs text-gray-500 text-center">Drag or Drop</p>
                  </div>

                  <div className="bg-blue-50 border border-gray-200 rounded-md flex items-center justify-center p-4">
                    {selectedLogo ? (
                      <div className="relative h-full w-full">
                        <img
                          src={selectedLogo || "/placeholder.svg"}
                          alt="Selected logo"
                          className="max-w-full max-h-full object-contain mx-auto"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 h-6 w-6 bg-white rounded-full"
                          onClick={() => setSelectedLogo(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-xs text-gray-500 font-medium">
                          Smart
                          <br />
                          internz
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 pt-4">
                <Button variant="outline" className="px-6" onClick={() => setShowAddSponsorDialog(false)}>
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

