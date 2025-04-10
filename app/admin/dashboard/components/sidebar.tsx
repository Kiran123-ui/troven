"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Bell,
  Crown,
  Home,
  Layers,
  Settings,
  ShoppingCart,
  Users,
  UserCircle,
  Headphones,
  FileText,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./providers"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Tenants Management", href: "/admin/dashboard/tenants" },
  { icon: Crown, label: "Subscriptions Management", href: "/admin/dashboard/subscriptions" },
  { icon: Layers, label: "Catalog", href: "/admin/dashboard/catalog" },
  { icon: UserCircle, label: "User Management", href: "/admin/dashboard/users" },
  { icon: ShoppingCart, label: "Sales", href: "/admin/dashboard/sales" },
{ icon: Settings, label: "Services Management", href: "/admin/dashboard/services" },
{ icon: FileText, label: "Candidate Report", href: "/admin/dashboard/candidate-report" },
  { icon: Headphones, label: "Support", href: "/admin/dashboard/support" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { setActiveItem } = useSidebar()
  const [notifications, setNotifications] = useState(3)

  return (
    <div className="w-70 bg-blue-600 text-white flex flex-col">
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
            <Bell className="w-5 h-5 cursor-pointer hover:text-blue-200 transition-colors" />
            {notifications > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
              >
                {notifications}
              </motion.span>
            )}
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-400 transition-colors">
            <Users className="w-4 h-4" />
          </div>
        </div>
      </div>

      <nav className="mt-6 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveItem(item.label.toLowerCase())}
              className={`relative flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                isActive ? "bg-blue-700" : "hover:bg-blue-700/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
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
        <Button variant="ghost" size="icon" className="ml-auto text-white hover:bg-blue-500 transition-colors">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
