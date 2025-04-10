"use client"

import React, { useState, useEffect } from 'react'
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
import { usePathname } from "next/navigation"

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
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Determine the active navigation item based on the current path
  const getActiveNav = (path: string) => {
    // Default to /tenant/dashboard for the root dashboard page
    if (path === '/tenant/dashboard' || path === '/tenant/dashboard/') {
      return '/tenant/dashboard';
    }
    
    // For other paths, use the current path
    return path;
  };
  
  const [activeNav, setActiveNav] = useState(getActiveNav(pathname));
  
  // Update active nav when pathname changes
  useEffect(() => {
    setActiveNav(getActiveNav(pathname));
  }, [pathname]);

  // Handle click outside for notifications dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showNotifications && !(event.target as Element).closest("[data-notifications]")) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

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
            <div className="relative" data-notifications>
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative focus:outline-none hover:text-blue-200 transition-colors cursor-pointer">
                <Bell className="w-5 h-5" />
              </button>

              {showNotifications && (
                <div className="absolute left-10 -top-4 mt-2 w-80 bg-white rounded-md shadow-xl overflow-hidden z-50 border border-gray-100 transform origin-top-right transition-all duration-200 animate-in fade-in slide-in-from-top-5">
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

        {/* Navigation */}
        <nav className="mt-8 flex-1">
          <ul className="space-y-1 px-2">
            <NavItem 
              icon={<Home size={20} />} 
              label="Home" 
              href="/tenant/dashboard" 
              active={activeNav === '/tenant/dashboard'}
            />
            <NavItem 
              icon={<Briefcase size={20} />} 
              label="Workspace" 
              href="/tenant/dashboard/workspace"
              active={activeNav === '/tenant/dashboard/workspace'}
            />
            <NavItem 
              icon={<Users size={20} />} 
              label="User management" 
              href="/tenant/dashboard/user-management" 
              active={activeNav === '/tenant/dashboard/user-management'}
            />
            <NavItem 
              icon={<FileText size={20} />} 
              label="Question Bank" 
              href="/tenant/dashboard/questions" 
              active={activeNav === '/tenant/dashboard/questions'}
            />
            <NavItem 
              icon={<Mail size={20} />} 
              label="Email templates" 
              href="/tenant/dashboard/email-templates" 
              active={activeNav === '/tenant/dashboard/email-templates'}
            />
            <NavItem 
              icon={<Trophy size={20} />} 
              label="Sponsor" 
              href="/tenant/dashboard/sponsors" 
              active={activeNav === '/tenant/dashboard/sponsors'}
            />
            <NavItem 
              icon={<BookOpen size={20} />} 
              label="Skills" 
              href="/tenant/dashboard/skills" 
              active={activeNav === '/tenant/dashboard/skills'}
            />
            <NavItem 
              icon={<GraduationCap size={20} />} 
              label="Student management" 
              href="/tenant/dashboard/student-management" 
              active={activeNav === '/tenant/dashboard/student-management'}
            />
            <NavItem 
              icon={<LogOut size={20} />} 
              label="Log out" 
              href="/logout" 
              active={activeNav === '/logout'}
            />
          </ul>
        </nav>

        {/* User profile */}
        <div className="p-4 mt-auto group">
          <Link href="/tenant/dashboard/profile" className="block">
            <div className="flex items-center gap-3 p-2 rounded-md transition-all duration-200 hover:bg-blue-700/50 group">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm group-hover:border-blue-300 transition-all duration-200">
                <AvatarImage src="/placeholder-user.jpg" alt="Sanjay Beri" />
                <AvatarFallback className="bg-blue-800 group-hover:bg-blue-900">SB</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate group-hover:text-white transition-colors">Sanjay Beri</div>
                <div className="text-xs text-blue-200 truncate group-hover:text-blue-100 transition-colors">sanjay@thesmartbridge.com</div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-1 p-1.5 rounded-full bg-blue-700/30 group-hover:bg-blue-700/70 group-hover:text-white cursor-pointer transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
