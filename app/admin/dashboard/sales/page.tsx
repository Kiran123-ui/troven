"use client"

import { useState } from "react"
import { PageTransition } from "../components/page-transition"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock data for sales chart
const salesData = [
  { name: "May", value: 4000 },
  { name: "Jun", value: 3000 },
  { name: "Jul", value: 5000 },
  { name: "Aug", value: 4000 },
  { name: "Sep", value: 6000 },
  { name: "Oct", value: 7000 },
  { name: "Nov", value: 8000 },
]

// Mock data for earnings chart
const earningsData = [
  { name: "May", value: 1000 },
  { name: "Jun", value: 2000 },
  { name: "Jul", value: 1500 },
  { name: "Aug", value: 2500 },
  { name: "Sep", value: 2000 },
  { name: "Oct", value: 3000 },
  { name: "Nov", value: 3500 },
]

// Mock data for expense chart
const expenseData = [
  { name: "May", value: 500 },
  { name: "Jun", value: 800 },
  { name: "Jul", value: 600 },
  { name: "Aug", value: 900 },
  { name: "Sep", value: 700 },
  { name: "Oct", value: 1000 },
  { name: "Nov", value: 1200 },
]

// Mock data for revenue growth chart
const revenueGrowthData = [
  { name: "May-1", value: 30 },
  { name: "May-2", value: 45 },
  { name: "May-3", value: 20 },
  { name: "May-4", value: 50 },
  { name: "Jun-1", value: 25 },
  { name: "Jun-2", value: 60 },
  { name: "Jun-3", value: 35 },
  { name: "Jun-4", value: 40 },
  { name: "Jul-1", value: 55 },
  { name: "Jul-2", value: 30 },
  { name: "Jul-3", value: 45 },
  { name: "Jul-4", value: 25 },
  { name: "Aug-1", value: 65 },
  { name: "Aug-2", value: 40 },
  { name: "Aug-3", value: 55 },
  { name: "Aug-4", value: 35 },
  { name: "Sep-1", value: 50 },
  { name: "Sep-2", value: 30 },
  { name: "Sep-3", value: 45 },
  { name: "Sep-4", value: 60 },
  { name: "Oct-1", value: 40 },
  { name: "Oct-2", value: 55 },
  { name: "Oct-3", value: 35 },
  { name: "Oct-4", value: 50 },
  { name: "Nov-1", value: 65 },
  { name: "Nov-2", value: 45 },
  { name: "Nov-3", value: 55 },
  { name: "Nov-4", value: 70 },
]

// Statement interface
interface Statement {
  id: string
  type: "credit" | "debit"
  amount: string
  description: string
  time: string
}

export default function SalesPage() {
  const [salesPlanFilter, setSalesPlanFilter] = useState("All Plan")
  const [salesTimeFilter, setSalesTimeFilter] = useState("Last 6 Months")
  const [earningsPlanFilter, setEarningsPlanFilter] = useState("All Plan")
  const [earningsTimeFilter, setEarningsTimeFilter] = useState("Last 6 Months")
  const [statementsTimeFilter, setStatementsTimeFilter] = useState("Last 6 Months")
  const [expenseTimeFilter, setExpenseTimeFilter] = useState("Last 6 Months")
  const [regionTimeFilter, setRegionTimeFilter] = useState("Last 6 Months")
  const [revenueGrowthTimeFilter, setRevenueGrowthTimeFilter] = useState("Last 6 Months")

  // Mock statements data
  const statements: Statement[] = [
    {
      id: "1",
      type: "debit",
      amount: "-500",
      description: "Refund is due in 2 days. Please make sure all necessary actions are completed.",
      time: "2 min ago",
    },
    {
      id: "2",
      type: "credit",
      amount: "+8000",
      description: "We're excited to introduce a brand-new dashboard feature that assessment tracking",
      time: "2 min ago",
    },
    {
      id: "3",
      type: "credit",
      amount: "+8000",
      description: "We're excited to introduce a brand-new dashboard feature that assessment tracking",
      time: "2 min ago",
    },
    {
      id: "4",
      type: "debit",
      amount: "-500",
      description: "Refund We're excited to introduce a brand-new dashboard feature that assessment tracking",
      time: "2 min ago",
    },
  ]

  return (
    <PageTransition>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sales</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>

        {/* Top Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl font-bold">
                  600 <span className="text-sm text-gray-500">CR</span>
                </h2>
                <p className="text-gray-500">Total Sales</p>
              </div>
              <div className="flex gap-2">
                <Select value={salesPlanFilter} onValueChange={setSalesPlanFilter}>
                  <SelectTrigger className="w-[120px] bg-white border border-gray-200 rounded-full">
                    <SelectValue placeholder="All Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Plan">All Plan</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={salesTimeFilter} onValueChange={setSalesTimeFilter}>
                  <SelectTrigger className="w-[150px] bg-white border border-gray-200 rounded-full">
                    <SelectValue placeholder="Last 6 Months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                    <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                    <SelectItem value="Last Month">Last Month</SelectItem>
                    <SelectItem value="Last Year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value / 1000}CR`}
                    domain={[0, 10000]}
                    ticks={[0, 2000, 4000, 6000, 8000]}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4ade80"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                    activeDot={{ r: 8, fill: "#4ade80", stroke: "white", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl font-bold">
                  450 <span className="text-sm text-gray-500">CR</span>
                </h2>
                <p className="text-gray-500">Total Earning</p>
              </div>
              <div className="flex gap-2">
                <Select value={earningsPlanFilter} onValueChange={setEarningsPlanFilter}>
                  <SelectTrigger className="w-[120px] bg-white border border-gray-200 rounded-full">
                    <SelectValue placeholder="All Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Plan">All Plan</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={earningsTimeFilter} onValueChange={setEarningsTimeFilter}>
                  <SelectTrigger className="w-[150px] bg-white border border-gray-200 rounded-full">
                    <SelectValue placeholder="Last 6 Months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                    <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                    <SelectItem value="Last Month">Last Month</SelectItem>
                    <SelectItem value="Last Year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={earningsData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 4000]} ticks={[0, 1000, 2000, 3000, 4000]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEarnings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Statements */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Statements</h2>
                <Select value={statementsTimeFilter} onValueChange={setStatementsTimeFilter}>
                  <SelectTrigger className="w-[150px] bg-white border border-gray-200 rounded-full">
                    <SelectValue placeholder="Last 6 Months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                    <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                    <SelectItem value="Last Month">Last Month</SelectItem>
                    <SelectItem value="Last Year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {statements.map((statement) => (
                  <div key={statement.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-3 h-3 rounded-full mt-1.5 ${
                          statement.type === "credit" ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span
                            className={`font-medium ${statement.type === "credit" ? "text-green-500" : "text-red-500"}`}
                          >
                            {statement.amount}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{statement.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{statement.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Expense Chart */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    25 <span className="text-sm text-gray-500">CR</span>
                  </h2>
                  <p className="text-gray-500">Expense</p>
                </div>
                <Select value={expenseTimeFilter} onValueChange={setExpenseTimeFilter}>
                  <SelectTrigger className="w-[150px] bg-white border border-gray-200 rounded-full">
                    <SelectValue placeholder="Last 6 Months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                    <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                    <SelectItem value="Last Month">Last Month</SelectItem>
                    <SelectItem value="Last Year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={expenseData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Growth Chart */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    80 <span className="text-sm text-gray-500">%</span>
                  </h2>
                  <p className="text-gray-500">Revenue Growth</p>
                </div>
                <Select value={revenueGrowthTimeFilter} onValueChange={setRevenueGrowthTimeFilter}>
                  <SelectTrigger className="w-[150px] bg-white border border-gray-200 rounded-full">
                    <SelectValue placeholder="Last 6 Months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                    <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                    <SelectItem value="Last Month">Last Month</SelectItem>
                    <SelectItem value="Last Year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueGrowthData}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                    barSize={6}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} hide />
                    <YAxis axisLine={false} tickLine={false} hide />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Sales by Region */}
        <div className="mt-6 bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                600 <span className="text-sm text-gray-500">CR</span>
              </h2>
              <p className="text-gray-500">Sales by Region</p>
            </div>
            <Select value={regionTimeFilter} onValueChange={setRegionTimeFilter}>
              <SelectTrigger className="w-[150px] bg-white border border-gray-200 rounded-full">
                <SelectValue placeholder="Last 6 Months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                <SelectItem value="Last Month">Last Month</SelectItem>
                <SelectItem value="Last Year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center">
            <svg width="400" height="400" viewBox="0 0 400 400">
              <path
                d="M200,50 C300,50 350,150 350,200 C350,250 300,350 200,350 C100,350 50,250 50,200 C50,150 100,50 200,50 Z"
                fill="#3b82f6"
                opacity="0.2"
              />
              <path
                d="M200,75 C275,75 325,150 325,200 C325,250 275,325 200,325 C125,325 75,250 75,200 C75,150 125,75 200,75 Z"
                fill="#3b82f6"
                opacity="0.4"
              />
              <path
                d="M200,100 C250,100 300,150 300,200 C300,250 250,300 200,300 C150,300 100,250 100,200 C100,150 150,100 200,100 Z"
                fill="#3b82f6"
                opacity="0.6"
              />
              <path
                d="M200,125 C225,125 275,150 275,200 C275,250 225,275 200,275 C175,275 125,250 125,200 C125,150 175,125 200,125 Z"
                fill="#3b82f6"
                opacity="0.8"
              />
              <path
                d="M200,150 C200,150 250,175 250,200 C250,225 200,250 200,250 C200,250 150,225 150,200 C150,175 200,150 200,150 Z"
                fill="#3b82f6"
              />
            </svg>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
