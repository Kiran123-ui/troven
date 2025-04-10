"use client"

import { PageTransition } from "../components/page-transition"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Headphones, MessageCircle, HelpCircle } from "lucide-react"

export default function SupportPage() {
  return (
    <PageTransition>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Support</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <MessageCircle size={16} />
            <span>New Ticket</span>
          </motion.button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    Open Tickets
                  </CardTitle>
                  <CardDescription>Active support tickets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24</div>
                  <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                    <span>↑ 5%</span>
                    <span className="text-gray-500">from last week</span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Headphones className="h-5 w-5 text-purple-600" />
                    Response Time
                  </CardTitle>
                  <CardDescription>Average first response</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2.4h</div>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <span>↓ 15%</span>
                    <span className="text-gray-500">from last week</span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-orange-600" />
                    Resolution Rate
                  </CardTitle>
                  <CardDescription>Tickets resolved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">92%</div>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <span>↑ 3%</span>
                    <span className="text-gray-500">from last week</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tickets</CardTitle>
                  <CardDescription>Latest support requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Login issue with mobile app", priority: "High", status: "Open" },
                      { title: "Payment failed for subscription", priority: "Medium", status: "In Progress" },
                      { title: "How to reset password?", priority: "Low", status: "Open" },
                      { title: "Feature request: Dark mode", priority: "Medium", status: "Open" },
                      { title: "Cannot access premium content", priority: "High", status: "In Progress" },
                    ].map((ticket, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            ticket.priority === "High"
                              ? "bg-red-100"
                              : ticket.priority === "Medium"
                                ? "bg-orange-100"
                                : "bg-green-100"
                          }`}
                        >
                          <MessageCircle
                            className={`h-5 w-5 ${
                              ticket.priority === "High"
                                ? "text-red-600"
                                : ticket.priority === "Medium"
                                  ? "text-orange-600"
                                  : "text-green-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{ticket.title}</h4>
                          <p className="text-sm text-gray-500">Priority: {ticket.priority}</p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            ticket.status === "Open"
                              ? "bg-blue-100 text-blue-800"
                              : ticket.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {ticket.status}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Management</CardTitle>
                <CardDescription>View and manage all support tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Ticket management content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Help articles and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Knowledge base content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Support system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Settings content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
