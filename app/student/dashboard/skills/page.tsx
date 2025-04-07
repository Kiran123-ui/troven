"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("Skills")

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

  const skills = [
    { id: 1, name: "React", parentSkill: "React", icon: "react" },
    { id: 2, name: "Java", parentSkill: "Java", icon: "java" },
    { id: 3, name: "Python", parentSkill: "Python", icon: "python" },
    { id: 4, name: "HTML", parentSkill: "HTML", icon: "html" },
  ]

  // Function to render skill icons
  const renderSkillIcon = (icon: string) => {
    switch (icon) {
      case "react":
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-400" fill="currentColor">
            <path d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            <path d="M12 22.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm0-5.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            <path d="M12 5.5c1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5zm0 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
            <path d="M21.5 12c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5zm-5.5 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
            <path d="M5.5 12c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5-3.5-1.6-3.5-3.5zm5.5 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />
          </svg>
        )
      case "java":
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-400" fill="currentColor">
            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.093-1.013-.714-6.063 1.297-2.606 1.859 9.417 1.524 17.162-.683 14.94-1.792M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 .001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" />
          </svg>
        )
      case "python":
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-500" fill="currentColor">
            <path d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.24l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z" />
          </svg>
        )
      case "html":
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-orange-500" fill="currentColor">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
          </svg>
        )
      default:
        return <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
    }
  }

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="flex justify-between items-center mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold">Skills</h1>
        <div className="flex gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Skills
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input className="pl-10 w-64 border-gray-300" placeholder="Search Skills" />
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
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Skill</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Parent Skill</th>
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => (
              <motion.tr
                key={skill.id}
                variants={itemVariants}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-500">{skill.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {renderSkillIcon(skill.icon)}
                    <span>{skill.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{skill.parentSkill}</td>
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

