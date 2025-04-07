"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Briefcase, FileText, GraduationCap, Home, Plus, Search, Settings, Trophy, Users, BookOpen, Edit, Trash2, LogOut, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function SponsorsPage() {
  const [activeTab, setActiveTab] = useState("Sponsor")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const sponsors = [
    { id: 1, name: "Smartinternz", website: "smartinternz.com" },
    { id: 2, name: "Smartinternz", website: "smartinternz.com" },
    { id: 3, name: "Smartinternz", website: "smartinternz.com" },
    { id: 4, name: "Smartinternz", website: "smartinternz.com" },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[260px] bg-blue-600 text-white flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
              <div className="h-6 w-6 text-blue-600">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M15.4099 7.3C14.8799 6.8 14.0099 6.9 13.6099 7.5L10.8199 11.4C10.7699 11.46 10.7099 11.51 10.6399 11.55C10.5699 11.59 10.4999 11.62 10.4199 11.64C10.3399 11.66 10.2699 11.67 10.1899 11.67C10.1099 11.67 10.0399 11.66 9.96994 11.64L8.55994 11.13C8.01994 10.95 7.52994 11.2 7.38994 11.75L6.02994 16.3C5.91994 16.74 6.22994 17.2 6.68994 17.2H17.2099C17.6599 17.2 17.9699 16.75 17.8699 16.32L16.5399 11.4C16.4499 11.04 16.1699 10.85 15.8699 10.79L15.4099 7.3Z"
                    fill="currentColor"
                  />
                </svg>
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
            <NavItem icon={<Home size={20} />} label="Home" href="/" />
            <NavItem icon={<Briefcase size={20} />} label="Workspace" href="/" />
            <NavItem icon={<Users size={20} />} label="User management" href="/" />
            <NavItem icon={<FileText size={20} />} label="Question Bank" href="/" />
            <NavItem icon={<Mail size={20} />} label="Email templates" href="/" />
            <NavItem icon={<Trophy size={20} />} label="Sponsor" active={activeTab === "Sponsor"} href="/sponsors" />
            <NavItem icon={<BookOpen size={20} />} label="Skills" href="/skills" />
            <NavItem icon={<GraduationCap size={20} />} label="Student management" href="/" />
            <NavItem icon={<LogOut size={20} />} label="Log out" href="/" />
          </ul>
        </nav>

        {/* User profile */}
        <div className="p-4 mt-auto">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src="/placeholder-user.jpg" alt="Sanjay Beri" />
              <AvatarFallback className="bg-blue-800">SB</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Sanjay Beri</div>
              <div className="text-sm text-blue-200">sanjay@thesmartbridge.com</div>
            </div>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="ml-auto p-1 hover:bg-blue-700/50 rounded-full">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="flex justify-between items-center mb-8" variants={itemVariants}>
            <h1 className="text-2xl font-bold">Sponsors</h1>
            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Sponsor
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input className="pl-10 w-64 border-gray-300" placeholder="Search Sponsor" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200"
          >
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">#</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">DP</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Website</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {sponsors.map((sponsor, index) => (
                  <motion.tr
                    key={sponsor.id}
                    variants={itemVariants}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-500">{sponsor.id}</td>
                    <td className="px-4 py-3">
                      <div className="h-10 w-10 border border-gray-200 rounded flex items-center justify-center bg-gray-50">
                        <span className="text-xs text-gray-500">
                          Smart
                          <br />
                          internz
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{sponsor.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <a href={`https://${sponsor.website}`} className="text-blue-600 hover:underline">
                        {sponsor.website}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full p-0 h-8 w-8 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full p-0 h-8 w-8 flex items-center justify-center text-white bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// Component for sidebar navigation items
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

