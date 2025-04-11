"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Bell,
  Home,
  Settings,
  Users,
  FileText,
  Briefcase,
  GraduationCap,
  BookOpen,
  LogOut,
  Mail,
  Trophy, 
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./providers"
import Image from "next/image"

const menuItems = [
  { icon: Home, label: "Home", href: "/tenant/dashboard" },
  { icon: Briefcase, label: "Workspace", href: "/tenant/dashboard/workspace" },
  { icon: Users, label: "User Management", href: "/tenant/dashboard/user-management" },
  { icon: FileText, label: "Question Bank", href: "/tenant/dashboard/questions" },
  { icon: Mail, label: "Email templates", href: "/tenant/dashboard/email-templates" },
  { icon: Trophy, label: "Sponsor", href: "/tenant/dashboard/sponsors" },
{ icon: BookOpen, label: "Skills", href: "/tenant/dashboard/skills" },
{ icon: GraduationCap, label: "Student Management", href: "/tenant/dashboard/student-management" },
  { icon: LogOut, label: "Log Out", href: "/tenant/dashboard/logout" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { setActiveItem } = useSidebar()
  const [notifications, setNotifications] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Handle click outside for notifications dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (showNotifications && !(event.target).closest("[data-notifications]")) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications])

  return (
    <div className="w-70 bg-blue-600 text-white flex flex-col">
      <div className="p-4 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
          <div className="h-6 w-6 text-blue-600">
            <Image
              src={"/tenant/Logo.png"}
              width={56}
              height={56}
              alt="Logo"
              className="object-cover"
            />
          </div>
        </div>
        <span className="text-xl font-bold">Troven</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative" data-notifications>
            <Bell 
              className="w-5 h-5 cursor-pointer hover:text-blue-200 transition-colors" 
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {notifications > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
              >
                {notifications}
              </motion.span>
            )}
            
            {showNotifications && (
              <div className="absolute left-9 -top-3 mt-2 w-80 bg-white rounded-md shadow-xl overflow-hidden z-50 border border-gray-100 transform origin-top-right transition-all duration-200 animate-in fade-in slide-in-from-top-5">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
                  <h3 className="text-base font-semibold text-blue-800">Notifications</h3>
                  <div className="bg-blue-100 text-blue-600 text-xs font-medium rounded-full px-2 py-0.5">4 new</div>
                </div>
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="p-4 border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer">
                    <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-800">Upcoming Assessment Deadline</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Assessment #456 is due in 2 days. Please make sure all necessary actions are completed.
                        </p>
                        <p className="text-xs text-gray-400 mt-1.5">2 min ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer">
                    <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-800">Dashboard Enhancement</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          We're excited to introduce a brand new dashboard feature that improves assessment tracking
                        </p>
                        <p className="text-xs text-gray-400 mt-1.5">15 min ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer">
                    <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-800">Policy Update</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          There's a new policy in effect regarding assessment documentation. Please review.
                        </p>
                        <p className="text-xs text-gray-400 mt-1.5">1 hour ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer">
                    <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-800">Dashboard Enhancement</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          We're excited to introduce a brand new dashboard feature that simplifies assessment
                        </p>
                        <p className="text-xs text-gray-400 mt-1.5">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-gradient-to-r from-blue-50 to-white border-t border-gray-100 text-center">
                  <Button variant="ghost" size="sm" className="text-blue-600 text-xs hover:text-blue-800 hover:bg-blue-100/50 w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
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

      <div className="p-4 border-t border-blue-500 flex items-center group cursor-pointer" onClick={()=>window.location.href="/tenant/dashboard/profile"}>  
        <Avatar className="h-12 w-12 border-2 border-white group-hover:border-blue-500 transition-colors">
          <AvatarImage src="/placeholder-user.jpg" alt="Sanjay Beri" />
          <AvatarFallback className="bg-blue-700">SB</AvatarFallback>
        </Avatar>
        <div className="ml-3 group-hover:text-blue-200 transition-colors">
          <p className="font-medium">Sanjay Beri</p>
          <p className="text-xs text-blue-200">sanjay@thesmartbridge.com</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto text-white group-hover:text-white cursor-pointer transition-colors">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
