"use client"

import type React from "react"

import { useState } from "react"
import {
  Bell,
  Crown,
  Filter,
  GraduationCapIcon as Graduation,
  Home,
  ImageIcon,
  Layers,
  LogOut,
  Search,
  Settings,
  ShoppingCart,
  Users,
  UserCircle,
  Headphones,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import TrovenGrowthChart from "./troven-growth-chart"

// Define types for component props
interface NavItemProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

interface StatCardProps {
  icon: React.ReactNode
  iconBg: string
  value: string
  label: string
}

interface DataTableProps {
  title: string
  data: Array<{
    tier: string
    value: string
    trend: string
  }>
}

interface ActivityItemProps {
  color: string
  title: string
  description: string
  time: string
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard")

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 bg-blue-600 text-white flex flex-col">
        <div className="p-4 flex items-center gap-2">
          <div className="bg-white rounded-full p-1.5">
            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none">
              <path d="M12 5.25L5.25 12 12 18.75 18.75 12 12 5.25z" fill="currentColor" />
              <path d="M16.5 7.5L12 12l4.5 4.5-4.5-4.5z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xl font-bold">Troven</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
        </div>

        <nav className="mt-6 flex-1">
          <NavItem
            icon={<Home className="w-5 h-5" />}
            label="Dashboard"
            active={activeNav === "Dashboard"}
            onClick={() => setActiveNav("Dashboard")}
          />
          <NavItem
            icon={<Users className="w-5 h-5" />}
            label="Tenants Management"
            active={activeNav === "Tenants Management"}
            onClick={() => setActiveNav("Tenants Management")}
          />
          <NavItem
            icon={<Crown className="w-5 h-5" />}
            label="Subscriptions Management"
            active={activeNav === "Subscriptions Management"}
            onClick={() => setActiveNav("Subscriptions Management")}
          />
          <NavItem
            icon={<Layers className="w-5 h-5" />}
            label="Catalog"
            active={activeNav === "Catalog"}
            onClick={() => setActiveNav("Catalog")}
          />
          <NavItem
            icon={<UserCircle className="w-5 h-5" />}
            label="User Management"
            active={activeNav === "User Management"}
            onClick={() => setActiveNav("User Management")}
          />
          <NavItem
            icon={<ShoppingCart className="w-5 h-5" />}
            label="Sales"
            active={activeNav === "Sales"}
            onClick={() => setActiveNav("Sales")}
          />
          <NavItem
            icon={<Headphones className="w-5 h-5" />}
            label="Support"
            active={activeNav === "Support"}
            onClick={() => setActiveNav("Support")}
          />
          <NavItem
            icon={<LogOut className="w-5 h-5" />}
            label="Logout"
            active={activeNav === "Logout"}
            onClick={() => setActiveNav("Logout")}
          />
        </nav>

        <div className="p-4 border-t border-blue-500 flex items-center">
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src="/placeholder-user.jpg" alt="Sanjay Beri" />
            <AvatarFallback className="bg-blue-700">SB</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium">Sanjay Beri</p>
            <p className="text-xs text-blue-200">sanjay@thesmartbridge.com</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Filters */}
          <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters with</span>
            </div>

            <Select defaultValue="last-three-month">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Last three month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-three-month">Last three month</SelectItem>
                <SelectItem value="last-six-month">Last six month</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="tenants-wise">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Tenants Wise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tenants-wise">Tenants Wise</SelectItem>
                <SelectItem value="tenants-type">Tenants Type</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="subscription-wise">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Subscription Wise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subscription-wise">Subscription Wise</SelectItem>
                <SelectItem value="subscription-type">Subscription Type</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input className="pl-10 bg-white" placeholder="Search With anything" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={<Crown className="w-5 h-5 text-blue-600" />}
              iconBg="bg-blue-100"
              value="305"
              label="Total Tenants"
            />
            <StatCard
              icon={<Users className="w-5 h-5 text-blue-600" />}
              iconBg="bg-blue-100"
              value="4502"
              label="Total Student Onboarded"
            />
            <StatCard
              icon={<Graduation className="w-5 h-5 text-blue-600" />}
              iconBg="bg-blue-100"
              value="2540"
              label="Total Students Attempted"
            />
            <StatCard
              icon={<ImageIcon className="w-5 h-5 text-blue-600" />}
              iconBg="bg-blue-100"
              value="40%"
              label="Students Attempted"
            />
          </div>

          {/* Main Content Grid with Activity on Right */}
          <div className="grid grid-cols-4 gap-6">
            {/* Left Content (Tables and Chart) */}
            <div className="col-span-3 space-y-6">
              {/* Subscription Performance */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Performance</h2>
                <div className="grid grid-cols-3 gap-6">
                  <DataTable
                    title="Total Tenants"
                    data={[
                      { tier: "Basic", value: "349", trend: "down" },
                      { tier: "Standard", value: "589", trend: "up" },
                      { tier: "Premium", value: "738", trend: "up" },
                    ]}
                  />
                  <DataTable
                    title="Total User"
                    data={[
                      { tier: "Basic", value: "349", trend: "down" },
                      { tier: "Standard", value: "589", trend: "up" },
                      { tier: "Premium", value: "738", trend: "up" },
                    ]}
                  />
                  <DataTable
                    title="Total Students"
                    data={[
                      { tier: "Basic", value: "349", trend: "down" },
                      { tier: "Standard", value: "589", trend: "up" },
                      { tier: "Premium", value: "738", trend: "up" },
                    ]}
                  />
                </div>
              </div>

              {/* Troven Growth Chart */}
              <div>
                <h2 className="text-lg font-medium mb-4">Troven Growth</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-semibold">60</span>
                          <span className="text-gray-500 text-sm">%</span>
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span className="text-sm text-gray-600">Sales</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-semibold">20</span>
                          <span className="text-gray-500 text-sm">%</span>
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                          <span className="text-sm text-gray-600">Tenants</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-semibold">15</span>
                          <span className="text-gray-500 text-sm">%</span>
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-sm text-gray-600">Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-semibold">80</span>
                          <span className="text-gray-500 text-sm">%</span>
                          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                          <span className="text-sm text-gray-600">Students</span>
                        </div>
                      </div>
                      <Select defaultValue="last-six-months">
                        <SelectTrigger className="w-[180px] rounded-full border border-gray-200">
                          <SelectValue placeholder="Last 6 Months" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last-six-months">Last 6 Months</SelectItem>
                          <SelectItem value="last-year">Last Year</SelectItem>
                          <SelectItem value="all-time">All Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Chart */}
                    <TrovenGrowthChart />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Side - Activity Section */}
            <div className="col-span-1">
              <h2 className="text-lg font-medium mb-4">Activity</h2>
              <Card className="h-[calc(100%-2rem)]">
                <CardContent className="p-4">
                  <div className="space-y-6">
                    <ActivityItem
                      color="red"
                      title="Upcoming Assessment Deadline"
                      description="Assessment #456 is due in 2 days. Please make sure all necessary actions are completed."
                      time="2 min ago"
                    />
                    <ActivityItem
                      color="green"
                      title="Dashboard Enhancement"
                      description="We're excited to introduce a brand-new dashboard feature that assessment tracking"
                      time="2 min ago"
                    />
                    <ActivityItem
                      color="red"
                      title="Upcoming Assessment Deadline"
                      description="Assessment #456 is due in 2 days. Please make sure all necessary actions are completed."
                      time="2 min ago"
                    />
                    <ActivityItem
                      color="green"
                      title="Dashboard Enhancement"
                      description="We're excited to introduce a brand-new dashboard feature that assessment tracking"
                      time="2 min ago"
                    />
                    <ActivityItem
                      color="green"
                      title="Dashboard Enhancement"
                      description="We're excited to introduce a brand-new dashboard feature that assessment tracking"
                      time="2 min ago"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component definitions
function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-3 text-left ${
        active ? "bg-blue-700" : "hover:bg-blue-700/50"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function StatCard({ icon, iconBg, value, label }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`${iconBg} p-3 rounded-lg`}>{icon}</div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function DataTable({ title, data }: DataTableProps) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <h3 className="font-medium text-gray-800 mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-500">{item.tier}</span>
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-800">{item.value}</span>
                {item.trend === "up" ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 4L12 8L8 12"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 8L8 12L4 8"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ color, title, description, time }: ActivityItemProps) {
  return (
    <div className="flex gap-3">
      <div className={`w-2 h-2 rounded-full mt-1.5 ${color === "red" ? "bg-red-500" : "bg-green-500"}`}></div>
      <div className="space-y-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  )
}
