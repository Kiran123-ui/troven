import { Crown, GraduationCapIcon as Graduation, ImageIcon, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageTransition } from "./components/page-transition"
import { StatCard } from "./components/dashboard/stats-card"
import { DataTable } from "./components/dashboard/data-table"
import { ActivityItem } from "./components/dashboard/activity-item"
import { Filters } from "./components/dashboard/filters"
import TrovenGrowthChart from "./components/troven-growth-chart"

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="p-6">
        <Filters />

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
    </PageTransition>
  )
}
