"use client"

import { useState } from "react"
import { PageTransition } from "../components/page-transition"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Star, Clock, Trash2, ExternalLink } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for revenue chart
const revenueData = [
  { name: "May", value: 4000 },
  { name: "Jun", value: 3000 },
  { name: "Jul", value: 5000 },
  { name: "Aug", value: 4000 },
  { name: "Sep", value: 6000 },
  { name: "Oct", value: 7000 },
  { name: "Nov", value: 8000 },
]

// Mock data for subscription chart
const subscriptionData = [
  { name: "May", value: 1000 },
  { name: "Jun", value: 2000 },
  { name: "Jul", value: 1500 },
  { name: "Aug", value: 2500 },
  { name: "Sep", value: 2000 },
  { name: "Oct", value: 3000 },
  { name: "Nov", value: 3500 },
]

// Subscription plan interface
interface SubscriptionPlan {
  id: string
  name: string
  price: string
  features: {
    name: string
    included: number
    total: number
  }[]
}

export default function SubscriptionsPage() {
  const [createSubscriptionOpen, setCreateSubscriptionOpen] = useState(false)
  const [revenuePlanFilter, setRevenuePlanFilter] = useState("All Plan")
  const [revenueTimeFilter, setRevenueTimeFilter] = useState("Last 6 Months")
  const [subscriptionPlanFilter, setSubscriptionPlanFilter] = useState("All Plan")
  const [subscriptionTimeFilter, setSubscriptionTimeFilter] = useState("Last 6 Months")
  const [newSubscription, setNewSubscription] = useState({
    name: "",
    price: "",
    description: "",
    features: [
      { name: "Assessments", included: 30, total: 50 },
      { name: "Student Profile", included: 30, total: 50 },
    ],
  })

  // Mock subscription plans
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: "1",
      name: "Troven Premium",
      price: "$19,999",
      features: [
        { name: "Assessments", included: 30, total: 50 },
        { name: "Student Profile", included: 30, total: 50 },
      ],
    },
    {
      id: "2",
      name: "Troven Gold",
      price: "$19,999",
      features: [
        { name: "Assessments", included: 30, total: 50 },
        { name: "Student Profile", included: 30, total: 50 },
      ],
    },
    {
      id: "3",
      name: "Troven Silver",
      price: "$19,999",
      features: [
        { name: "Assessments", included: 30, total: 50 },
        { name: "Student Profile", included: 30, total: 50 },
      ],
    },
  ]

  // Handle create subscription
  const handleCreateSubscription = () => {
    alert("Creating new subscription: " + JSON.stringify(newSubscription))
    setCreateSubscriptionOpen(false)
    setNewSubscription({
      name: "",
      price: "",
      description: "",
      features: [
        { name: "Assessments", included: 30, total: 50 },
        { name: "Student Profile", included: 30, total: 50 },
      ],
    })
  }

  return (
    <PageTransition>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Subscriptions Management</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCreateSubscriptionOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Subscription
          </Button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Troven Revenue</h2>
              <div className="flex gap-2">
                <Select value={revenuePlanFilter} onValueChange={setRevenuePlanFilter}>
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
                <Select value={revenueTimeFilter} onValueChange={setRevenueTimeFilter}>
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
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#colorRevenue)"
                    activeDot={{ r: 8, fill: "#4ade80", stroke: "white", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subscription Chart */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Troven Subscription</h2>
              <div className="flex gap-2">
                <Select value={subscriptionPlanFilter} onValueChange={setSubscriptionPlanFilter}>
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
                <Select value={subscriptionTimeFilter} onValueChange={setSubscriptionTimeFilter}>
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
                  data={subscriptionData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorSubscription" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 4000]} ticks={[0, 1000, 2000, 3000, 4000]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorSubscription)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Subscription Plans Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Subscription Plans</h2>
          <div className="grid grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg overflow-hidden border border-gray-100">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <span className="text-xl font-bold">{plan.price}</span>
                </div>
                <div className="p-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-700">{feature.name}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-green-500" />
                          <span className="text-gray-900">{feature.included}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-gray-900">{feature.total}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center mt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">20+ Other Service</Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full border-red-200 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full border-blue-200 text-blue-500">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Subscription Dialog */}
        <Dialog open={createSubscriptionOpen} onOpenChange={setCreateSubscriptionOpen}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-lg">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Create Subscription</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCreateSubscriptionOpen(false)}
                className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#FF0000" strokeWidth="1.5" />
                  <path d="M15 9L9 15M9 9L15 15" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Button>
            </div>

            <div className="p-5 space-y-4">
              {/* Name input */}
              <Input placeholder="Name" className="w-full border border-gray-200 rounded-md h-12" />

              {/* Price row */}
              <div className="flex gap-3">
                <Select defaultValue="INR">
                  <SelectTrigger className="w-[120px] border border-gray-200 h-12">
                    <SelectValue placeholder="INR (₹)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>

                <Input placeholder="Price" className="flex-1 border border-gray-200 rounded-md h-12" />
              </div>

              {/* Features */}
              <div className="space-y-2">
                {/* Assessments row */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md">
                  <span className="text-gray-700">Assessments</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-900">50</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-5 w-5 text-green-500" />
                      <span className="text-gray-900">30</span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500 h-6 w-6">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="8" stroke="#FF0000" strokeWidth="1.5" />
                        <path d="M13 7L7 13M7 7L13 13" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </Button>
                  </div>
                </div>

                {/* Student Profile row */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md">
                  <span className="text-gray-700">Student Profile</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-900">50</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-5 w-5 text-green-500" />
                      <span className="text-gray-900">30</span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500 h-6 w-6">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="8" stroke="#FF0000" strokeWidth="1.5" />
                        <path d="M13 7L7 13M7 7L13 13" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Add new feature row */}
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-[180px] border border-gray-200">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assessments">Assessments</SelectItem>
                    <SelectItem value="student-profile">Student Profile</SelectItem>
                    <SelectItem value="reports">Reports</SelectItem>
                  </SelectContent>
                </Select>

                <Input placeholder="Credits" className="w-[120px] border border-gray-200 rounded-md" />

                <Select>
                  <SelectTrigger className="w-[150px] border border-gray-200">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-blue-600 hover:bg-blue-700 h-10 w-10 p-0">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setCreateSubscriptionOpen(false)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  )
}
