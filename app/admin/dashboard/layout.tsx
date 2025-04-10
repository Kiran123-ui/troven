import type React from "react"
import type { Metadata } from "next"

import { Sidebar } from "./components/sidebar"
import { Providers } from "./components/providers"



export const metadata: Metadata = {
  title: "Troven Dashboard",
  description: "Modern dashboard for Troven platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}

