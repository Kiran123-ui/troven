"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { AnimatePresence } from "framer-motion"

type SidebarContextType = {
  activeItem: string
  setActiveItem: (item: string) => void
}

const SidebarContext = createContext<SidebarContextType>({
  activeItem: "dashboard",
  setActiveItem: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

export function Providers({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <SidebarContext.Provider value={{ activeItem, setActiveItem }}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </SidebarContext.Provider>
  )
}
