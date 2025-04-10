"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Calendar, CheckCircle, GraduationCap, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm, Controller } from "react-hook-form"
import dynamic from "next/dynamic"

// Dynamically import TipTap Editor to avoid SSR issues
const TipTapEditor = dynamic(
  () => import('@/components/rich-text-editor').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <div className="h-64 w-full border border-gray-200 rounded-md animate-pulse bg-gray-50"></div>,
  }
);

// Define form data type
interface EmailTemplateForm {
  title: string
  content: string
}

export default function EmailTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("Welcome template")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle browser-side rendering only
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // React Hook Form setup
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailTemplateForm>({
    defaultValues: {
      title: "",
      content: "<p></p>", // Empty TipTap content
    },
  })

  // Handle form submission
  const onSubmit = (data: EmailTemplateForm) => {
    console.log("Form submitted:", {
      title: data.title,
      content: data.content
    })
    // Here you would typically save the template to your backend

    // Close modal and reset form
    setShowCreateModal(false)
    reset({
      title: "",
      content: "<p></p>",
    })
  }

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

  const modalVariants = {
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

  // Template data
  const templates = [
    {
      id: "welcome",
      name: "Welcome template",
      icon: <Sparkles className="h-5 w-5 text-blue-600" />,
    },
    {
      id: "reminder",
      name: "Reminder Template",
      icon: <Bell className="h-5 w-5 text-blue-600" />,
    },
    {
      id: "result",
      name: "Result Template",
      icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
    },
    {
      id: "completion",
      name: "Completion Template",
      icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
    },
    {
      id: "interview",
      name: "Interview Template",
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
    },
  ]

  // Handle modal close
  const handleCloseModal = () => {
    setShowCreateModal(false)
    reset({
      title: "",
      content: "<p></p>",
    })
  }

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-2xl font-bold mb-8" variants={itemVariants}>
        Email templates
      </motion.h1>

      <motion.div className="border-t border-gray-200 pt-8" variants={itemVariants}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Templates List */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Templates</h2>
            <div className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-md p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                    selectedTemplate === template.name
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedTemplate(template.name)}
                >
                  {template.icon}
                  <span className="font-medium">{template.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Template Preview/Editor */}
          <div className="w-full md:w-2/3">
            <div className="border border-gray-200 rounded-md p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">{selectedTemplate}</h2>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    reset({
                      title: "",
                      content: "<p></p>",
                    })
                    setShowCreateModal(true)
                  }}
                >
                  <span>Create Template</span>
                </Button>
              </div>

              {/* Template content would go here */}
              <div className="h-[500px] flex items-center justify-center text-gray-400">
                {selectedTemplate === "Welcome template" && (
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                    <p>Welcome template content would appear here</p>
                    <p className="text-sm mt-2">Click "Create Template" to customize this template</p>
                  </div>
                )}
                {selectedTemplate === "Reminder Template" && (
                  <div className="text-center">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                    <p>Reminder template content would appear here</p>
                    <p className="text-sm mt-2">Click "Create Template" to customize this template</p>
                  </div>
                )}
                {selectedTemplate === "Result Template" && (
                  <div className="text-center">
                    <GraduationCap className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                    <p>Result template content would appear here</p>
                    <p className="text-sm mt-2">Click "Create Template" to customize this template</p>
                  </div>
                )}
                {selectedTemplate === "Completion Template" && (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                    <p>Completion template content would appear here</p>
                    <p className="text-sm mt-2">Click "Create Template" to customize this template</p>
                  </div>
                )}
                {selectedTemplate === "Interview Template" && (
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                    <p>Interview template content would appear here</p>
                    <p className="text-sm mt-2">Click "Create Template" to customize this template</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Create Template Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-md w-full max-w-3xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">New {selectedTemplate}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={handleCloseModal}
                >
                  <X className="h-5 w-5 text-red-500" />
                </Button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6">
                  <div className="mb-6">
                    <Input
                      placeholder="Title"
                      className={`border-gray-300 h-12 ${errors.title ? "border-red-500" : ""}`}
                      {...register("title", {
                        required: "Title is required",
                      })}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                  </div>

                  {/* TipTap Rich Text Editor */}
                  <div className="mb-4">
                    {isMounted && (
                      <Controller
                        name="content"
                        control={control}
                        rules={{ required: "Content is required" }}
                        render={({ field }) => (
                          <div className="rich-editor-wrapper border border-gray-300 rounded-md overflow-hidden">
                            <TipTapEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Write Template Content"
                            />
                          </div>
                        )}
                      />
                    )}
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                  </div>
                </div>

                <div className="flex justify-end gap-3 p-6 pt-4 border-t border-gray-200 mt-10">
                  <Button type="button" variant="outline" className="px-6" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button type="submit" className="px-6 bg-blue-600 hover:bg-blue-700">
                    Create
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
