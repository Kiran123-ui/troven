"use client"

import { Filter, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function Filters() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-blue-50 p-3 rounded-lg flex items-center gap-3 mb-6"
    >
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
    </motion.div>
  )
}
