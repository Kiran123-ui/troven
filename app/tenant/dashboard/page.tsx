"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Search, ExternalLink, Share2, Copy, ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  const [activeFilter, setActiveFilter] = useState("All")

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
      icon: (
        <div className="bg-blue-100 p-3 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
              stroke="#1763FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M7 7H17" stroke="#1763FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 12H17" stroke="#1763FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 17H13" stroke="#1763FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      title: "Total Students Invited",
      value: "4502",
      icon: (
        <div className="bg-blue-100 p-3 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8L22 12L18 16" stroke="#1763FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12H22" stroke="#1763FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      title: "Total Students Attempted",
      value: "2540",
      icon: (
        <div className="bg-blue-100 p-3 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
              stroke="#1763FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
              stroke="#1763FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M20 8V14" stroke="#1763FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 11H17" stroke="#1763FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
    {
      id: 4,
      title: "Total Qualified",
      value: "40%",
      icon: (
        <div className="bg-blue-100 p-3 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
              stroke="#1763FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
  ]

  // Filter options
  const filters = ["All", "SmartInternz", "Google Cloud", "Google Backend", "Test Workspace"]

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
      title: "Microsoft - .net",
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
      title: "Google Backend - Python Team",
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
      title: "Big Data - Scala",
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

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-white p-6 rounded-md border border-gray-200"
        variants={containerVariants}
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} className="flex items-center gap-4" variants={itemVariants}>
            <div>{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Assessments Section */}
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Recent Assessments</h2>

        <div className="bg-gray-100 p-4 rounded-md flex flex-wrap items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                className={`rounded-full ${
                  activeFilter === filter ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input className="pl-10 w-64 border-gray-300" placeholder="Search With anything" />
            </div>
            <Button variant="outline" className="bg-white">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <h3 className="text-lg font-medium mb-4">Skill based assessment</h3>
      </motion.div>

      {/* Assessment Cards */}
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
                      stroke="#1763FF"
                      strokeWidth="3"
                      strokeDasharray={`${assessment.percentage}, 100`}
                      strokeLinecap="round"
                    />
                    <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#1763FF" fontWeight="bold">
                      {assessment.percentage}%
                    </text>
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-blue-600">Qualifying</div>
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
                  <Button variant="outline" size="sm" className="h-9 flex items-center gap-1">
                    <span>Invite</span>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 flex items-center gap-1">
                    <span>Preview</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 flex items-center gap-1">
                    <span>Clone</span>
                    <Copy className="h-4 w-4" />
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
    </motion.div>
  )
}
