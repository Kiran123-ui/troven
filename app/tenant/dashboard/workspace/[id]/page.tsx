"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Trash2,
  Copy,
  Share2,
  ExternalLink,
  ChevronDown,
  X,
  Calendar,
  ArrowRight,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function WorkspaceDetailPage({ params }: { params: { id: string } }) {
  const [showCreateAssessmentModal, setShowCreateAssessmentModal] = useState(false)
  const [showCloneAssessmentModal, setShowCloneAssessmentModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [assessmentType, setAssessmentType] = useState("Role Based Assessment")
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    messageTemplate: "",
    duration: "",
    difficultyLevel: "",
    startDate: "",
    endDate: "",
    totalMarks: "",
    passMarks: "",
    negativeMarks: "",
    instructions: "",
    sponsor: "",
    color: "#1763ff",
    showResults: true,
    disabledClipboard: true,
    startWithFullScreen: true,
    submitOnTabSwitch: true,
    enableWebcam: true,
    enableMicrophone: true,
    mfaVerification: true,
  })
  
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

  // Assessment data
  const assessments = [
    {
      id: 1,
      title: "Python Quiz Test | Interview",
      team: "Google Backend - Python Team",
      creator: "Sanjay",
      date: "Aug 03 2023",
      percentage: 69,
      questions: 20,
      registered: 10,
      completed: 5,
      qualified: 5,
    },
    {
      id: 2,
      title: "Python Quiz Test | Interview",
      team: "Google Backend - Python Team",
      creator: "Sanjay",
      date: "Aug 03 2023",
      percentage: 69,
      questions: 20,
      registered: 10,
      completed: 5,
      qualified: 5,
    },
    {
      id: 3,
      title: "Python Quiz Test | Interview",
      team: "Google Backend - Python Team",
      creator: "Sanjay",
      date: "Aug 03 2023",
      percentage: 69,
      questions: 20,
      registered: 10,
      completed: 5,
      qualified: 5,
    },
    {
      id: 4,
      title: "Python Quiz Test | Interview",
      team: "Google Backend - Python Team",
      creator: "Sanjay",
      date: "Aug 03 2023",
      percentage: 69,
      questions: 20,
      registered: 10,
      completed: 5,
      qualified: 5,
    },
  ]
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form
      setShowCreateAssessmentModal(false)
      setCurrentStep(1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      setShowCreateAssessmentModal(false)
      setCurrentStep(1)
    }
  }

  const handleCloseModal = () => {
    setShowCreateAssessmentModal(false)
    setShowCloneAssessmentModal(false)
    setCurrentStep(1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  // Render form step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Assessment Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="h-12 border-gray-300"
              />

              <div className="relative">
                <div className="border border-gray-300 rounded-md h-12 flex items-center justify-between px-4">
                  <span className="text-gray-500">Message template</span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Duration (in minutes)"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="h-12 border-gray-300"
              />

              <div className="relative">
                <div className="border border-gray-300 rounded-md h-12 flex items-center justify-between px-4">
                  <span className="text-gray-500">Difficulty level</span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <Input
                  placeholder="Start Date & Time"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 pl-4 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>

              <div className="relative">
                <Input
                  placeholder="End Date & Time"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 pl-4 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="Total Marks"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleInputChange}
                className="h-12 border-gray-300"
              />

              <Input
                placeholder="Pass Marks"
                name="passMarks"
                value={formData.passMarks}
                onChange={handleInputChange}
                className="h-12 border-gray-300"
              />

              <Input
                placeholder="Negative Marks"
                name="negativeMarks"
                value={formData.negativeMarks}
                onChange={handleInputChange}
                className="h-12 border-gray-300"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="p-6">
            <div className="mb-4">
              <Textarea
                placeholder="Instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                className="min-h-[120px] border-gray-300 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="border border-gray-300 rounded-md h-12 flex items-center justify-between px-4">
                  <span className="text-gray-500">Sponser</span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-700">Color</span>
                <div className="w-16 h-8 bg-blue-600 rounded-md"></div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-700">Show Results</span>
                <div className="flex items-center justify-center h-6 w-6 bg-green-50 rounded-md">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                <span className="text-gray-700">Disabled Clipboard</span>
                <div className="flex items-center justify-center h-6 w-6 bg-gray-100 rounded-md">
                  <Check className="h-4 w-4 text-gray-600" />
                </div>
              </div>

              <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                <span className="text-gray-700">Start with Full screen</span>
                <div className="flex items-center justify-center h-6 w-6 bg-green-50 rounded-md">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>

              <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                <span className="text-gray-700">Submit on tab switch</span>
                <div className="flex items-center justify-center h-6 w-6 bg-green-50 rounded-md">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>

              <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                <span className="text-gray-700">Enable webcam</span>
                <div className="flex items-center justify-center h-6 w-6 bg-green-50 rounded-md">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>

              <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                <span className="text-gray-700">Enable microphone</span>
                <div className="flex items-center justify-center h-6 w-6 bg-green-50 rounded-md">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>

              <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                <span className="text-gray-700">MFA verification</span>
                <div className="flex items-center justify-center h-6 w-6 bg-green-50 rounded-md">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Workspace Header */}
      <motion.div className="bg-white rounded-md border border-gray-200 p-6 mb-8" variants={itemVariants}>
        <div className="flex items-start gap-6">
          <div className="h-24 w-24 bg-gray-100 rounded-md overflow-hidden">
            <img
              src="/placeholder.svg?height=96&width=96&text=Python"
              alt="Google Backend - Python Team"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">Google Backend - Python Team (ID: {params.id})</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
              <div>
                <div className="text-sm text-gray-500">Role based assessments</div>
                <div className="font-medium">15</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Skill based Assessments</div>
                <div className="font-medium">15</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last visited</div>
                <div className="font-medium">2 days ago</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Students attempted</div>
                <div className="font-medium">10</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-2">Limit of the workspace: 8/10</div>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden w-full">
                <div className="bg-blue-600 h-full rounded-full w-4/5"></div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-red-200 text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-white hover:bg-gray-50"
              onClick={() => setShowCloneAssessmentModal(true)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Clone
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreateAssessmentModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Assessments Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
        {assessments.map((assessment) => (
          <motion.div
            key={assessment.id}
            className="bg-white rounded-md border border-gray-200 overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold">{assessment.title}</h3>
              <div className="text-sm text-gray-500 mb-3">{assessment.team}</div>

              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  By {assessment.creator} · {assessment.date}
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E6E6E6"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray={`${assessment.percentage}, 100`}
                      strokeLinecap="round"
                    />
                    <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#3B82F6" fontWeight="bold">
                      {assessment.percentage}%
                    </text>
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-blue-600">
                    Qualifying
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 text-center border-t border-b border-gray-200 py-4 mb-4">
                <div>
                  <div className="text-xl font-semibold">{assessment.questions}</div>
                  <div className="text-xs text-gray-500">Questions</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">{assessment.registered}</div>
                  <div className="text-xs text-gray-500">registered</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">{assessment.completed}</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">{assessment.qualified}</div>
                  <div className="text-xs text-gray-500">Qualified</div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-9">
                    <Share2 className="h-4 w-4 mr-2" />
                    Invite
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <Copy className="h-4 w-4 mr-2" />
                    Clone
                  </Button>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 h-9">
                  Action
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Create Assessment Modal */}
      <AnimatePresence>
        {showCreateAssessmentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-md w-full max-w-3xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">{currentStep === 1 ? assessmentType : "New Assessment"}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={handleCloseModal}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Progress Steps */}
              <div className="px-6 pt-6 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div
                      className={`text-blue-600 font-medium ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}
                    >
                      1. Assessment Details
                    </div>
                    <div
                      className={`h-1 w-full mt-2 rounded-full ${currentStep >= 1 ? "bg-blue-600" : "bg-gray-200"}`}
                      style={{ width: "180px" }}
                    ></div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={`font-medium ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                      2. Sponsorship
                    </div>
                    <div
                      className={`h-1 w-full mt-2 rounded-full ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
                      style={{ width: "180px" }}
                    ></div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={`font-medium ${currentStep >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                      3. Permission
                    </div>
                    <div
                      className={`h-1 w-full mt-2 rounded-full ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}
                      style={{ width: "180px" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              {renderStepContent()}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 p-6 pt-4 border-t border-gray-200">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                ) : (
                  <Button variant="outline" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                )}
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
                  {currentStep === 3 ? "Create" : "Next"}
                  {currentStep !== 3 && <ArrowRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clone Assessment Modal */}
      <AnimatePresence>
        {showCloneAssessmentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-md w-full max-w-5xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Clone Assessment</h2>

                <div className="flex justify-end gap-4 mb-8">
                  <div className="relative w-64">
                    <div className="border border-gray-300 rounded-md h-10 flex items-center justify-between px-4">
                      <span className="text-gray-500">Filter by Workspace</span>
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>

                  <div className="relative w-64">
                    <div className="border border-gray-300 rounded-md h-10 flex items-center justify-between px-4">
                      <span className="text-gray-500">Filter by Sponsor</span>
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Python Quiz Test | Interview</h3>
                      <div className="text-sm text-gray-500">Google Backend - Python Team</div>
                      <div className="text-sm text-gray-500 mt-1">By Sanjay · Aug 03 2023 · Coding</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-xl font-semibold">20</div>
                        <div className="text-xs text-gray-500">Questions</div>
                      </div>

                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Clone
                        <Copy className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button variant="outline" onClick={() => setShowCloneAssessmentModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
