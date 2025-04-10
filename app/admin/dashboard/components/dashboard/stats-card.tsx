import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  icon: React.ReactNode
  iconBg: string
  value: string
  label: string
}

export function StatCard({ icon, iconBg, value, label }: StatCardProps) {
  return (
    <Card className="overflow-hidden">
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
