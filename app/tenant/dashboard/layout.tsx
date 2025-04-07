"use client"

import React from 'react'
import { motion } from "framer-motion"
import {
  Bell,
  Briefcase,
  FileText,
  GraduationCap,
  Home,
  Settings,
  Trophy,
  Users,
  BookOpen,
  LogOut,
  Mail,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'

// NavItem component
function NavItem({ icon, label, active = false, href = "/" }) {
  return (
    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-3 w-full rounded-md ${
          active ? "bg-blue-700" : "hover:bg-blue-700/50"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </motion.li>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[260px] bg-blue-600 text-white flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
            <span className="text-xl font-semibold">Troven</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              <Bell className="w-5 h-5" />
            </div>
            <Settings className="w-5 h-5" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex-1">
          <ul className="space-y-1 px-2">
            <NavItem icon={<Home size={20} />} label="Home" href="/tenant/dashboard" />
            <NavItem icon={<Briefcase size={20} />} label="Workspace" href="/tenant/dashboard/workspace" />
            <NavItem icon={<Users size={20} />} label="User management" href="/tenant/dashboard/user-management" />
            <NavItem icon={<FileText size={20} />} label="Question Bank" href="/tenant/dashboard/questions" />
            <NavItem icon={<Mail size={20} />} label="Email templates" href="/tenant/dashboard/emails" />
            <NavItem icon={<Trophy size={20} />} label="Sponsor" href="/tenant/dashboard/sponsors" />
            <NavItem icon={<BookOpen size={20} />} label="Skills" href="/tenant/dashboard/skills" />
            <NavItem icon={<GraduationCap size={20} />} label="Student management" href="/tenant/dashboard/student-management" />
            <NavItem icon={<LogOut size={20} />} label="Log out" href="/logout" />
          </ul>
        </nav>

        {/* User profile */}
        <div className="p-4 mt-auto">
          <div className="flex items-center gap-3 cursor-pointer" onClick={()=>window.location.href="/tenant/dashboard/profile"}>
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src="/placeholder-user.jpg" alt="Sanjay Beri" />
              <AvatarFallback className="bg-blue-800">SB</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Sanjay Beri</div>
              <div className="text-sm text-blue-200">sanjay@thesmartbridge.com</div>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto p-1 hover:bg-blue-700/50 rounded-full">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
