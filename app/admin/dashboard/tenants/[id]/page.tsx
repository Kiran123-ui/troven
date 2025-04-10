"use client"

import { useState } from "react"
import { PageTransition } from "../../components/page-transition"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Mail, Users, GraduationCapIcon, ImageIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock data for the chart
const chartData = [
  { month: "May", RoleBased: 80, SkillBased: 60 },
  { month: "Jun", RoleBased: 95, SkillBased: 65 },
  { month: "Jul", RoleBased: 85, SkillBased: 75 },
  { month: "Aug", RoleBased: 90, SkillBased: 80 },
  { month: "Sep", RoleBased: 85, SkillBased: 85 },
  { month: "Oct", RoleBased: 95, SkillBased: 90 },
  { month: "Nov", RoleBased: 98, SkillBased: 92 },
]

export default function TenantDetailsPage() {
  const params = useParams()
  const [dateRange, setDateRange] = useState("Last 6 Months")
  const [frequency, setFrequency] = useState("Weekly")
  const [userStatus, setUserStatus] = useState("Active")
  const [assessmentView, setAssessmentView] = useState("Assessment type") // New state for assessment graph dropdown

  // Mock tenant data
  const tenant = {
    id: "5405TDCC",
    name: "The smart bridge PVT. LTD",
    createdOn: "20-08-2023",
    stats: {
      totalAssessments: 305,
      studentsOnboarded: 4502,
      studentsAttempted: 2540,
      totalUsers: 59878,
    },
    subscription: {
      name: "Troven Premium",
      price: "$19,999",
      creditsUsed: 50,
      totalCredits: 100,
      validUntil: "21-08-2023",
    },
  }

  return (
    <PageTransition>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tenant Details</h1>
          <div className="flex gap-3">
            <div className="relative">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px] bg-white pl-10">
                  <Calendar className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <SelectValue placeholder="Select Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                  <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                  <SelectItem value="Last Month">Last Month</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="w-[120px] bg-white">
                <SelectValue placeholder="Weekly" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{tenant.stats.totalAssessments}</div>
              <div className="text-sm text-gray-500">Total Assessments</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{tenant.stats.studentsOnboarded}</div>
              <div className="text-sm text-gray-500">students onboarded</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <GraduationCapIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{tenant.stats.studentsAttempted}</div>
              <div className="text-sm text-gray-500">students attempted</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{tenant.stats.totalUsers}</div>
              <div className="text-sm text-gray-500">Total users</div>
            </div>
          </motion.div>
        </div>

        {/* Tenant Info */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">{tenant.name}</h2>
            <div className="text-gray-500">
              ID: {tenant.id} &nbsp;&nbsp; Created on: {tenant.createdOn}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">User Status</span>
              <Select value={userStatus} onValueChange={setUserStatus}>
                <SelectTrigger className="w-[120px] bg-white">
                  <SelectValue placeholder="Active" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-4 gap-6">
          {/* Chart */}
          <div className="col-span-3">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Select value={assessmentView} onValueChange={setAssessmentView}>
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Assessment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Assessment type">Assessment type</SelectItem>
                      <SelectItem value="Assessment frequency">Assessment frequency</SelectItem>
                    </SelectContent>
                  </Select>
                  
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-semibold">60+</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <span className="text-sm text-gray-600">Role Based</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-semibold">20+</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-600">Skill based</span>
                    </div>
                  </div>
                  <Select defaultValue="Last 6 Months">
                    <SelectTrigger className="w-[150px] bg-white">
                      <SelectValue placeholder="Last 6 Months" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                      <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                      <SelectItem value="Last Month">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRoleBased" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorSkillBased" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Area
                      type="monotone"
                      dataKey="RoleBased"
                      stroke="#3B82F6"
                      fillOpacity={1}
                      fill="url(#colorRoleBased)"
                    />
                    <Area
                      type="monotone"
                      dataKey="SkillBased"
                      stroke="#EF4444"
                      fillOpacity={1}
                      fill="url(#colorSkillBased)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Subscription Info */}
          <div className="col-span-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Subscription Plans</h3>
            </div>
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold">{tenant.subscription.name}</h4>
                <span className="text-xl font-bold">{tenant.subscription.price}</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Credits used</span>
                  <span className="font-medium">
                    {tenant.subscription.creditsUsed} Credit Used out of {tenant.subscription.totalCredits}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid upto</span>
                  <span className="font-medium">{tenant.subscription.validUntil}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
