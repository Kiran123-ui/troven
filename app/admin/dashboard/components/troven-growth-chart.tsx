"use client"

import { useMemo } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockData = [
  { month: "May", Sales: 40, Tenants: 30, Users: 50, Students: 80 },
  { month: "Jun", Sales: 60, Tenants: 25, Users: 55, Students: 70 },
  { month: "Jul", Sales: 55, Tenants: 40, Users: 60, Students: 65 },
  { month: "Sep", Sales: 58, Tenants: 35, Users: 65, Students: 75 },
  { month: "Aug", Sales: 65, Tenants: 45, Users: 70, Students: 65 },
  { month: "Nov", Sales: 70, Tenants: 50, Users: 75, Students: 85 },
]

export default function TrovenGrowthChart() {
  // Create formatted data for stacked area chart
  const chartData = useMemo(() => {
    return mockData.map((item) => ({
      ...item,
      // The order matters for stacking - from bottom to top
      // The latest item will be on top
      TenantValue: item.Tenants,
      UserValue: item.Users,
      StudentValue: item.Students,
    }))
  }, [])

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorTenants" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            ticks={[0, 20, 40, 60, 80, 100]}
            domain={[0, 100]}
          />
          <Tooltip
            formatter={(value) => [`${value}%`]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          />
          <Area
            type="monotone"
            dataKey="TenantValue"
            stackId="1"
            stroke="#10B981"
            strokeWidth={2}
            fill="url(#colorTenants)"
          />
          <Area
            type="monotone"
            dataKey="UserValue"
            stackId="1"
            stroke="#EF4444"
            strokeWidth={2}
            fill="url(#colorUsers)"
          />
          <Area
            type="monotone"
            dataKey="StudentValue"
            stackId="1"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#colorStudents)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
