"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageTransition } from "../components/page-transition"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Checkbox } from "@/components/ui/checkbox"
import { Crown, GraduationCapIcon, ImageIcon, Plus, Search, Users, Mail, Eye, Trash2, X, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Define tenant data type
interface Tenant {
  id: string
  name: string
  createdOn: string
  subscription: string
  contact: {
    email: string
    phone: string
  }
  status: "Active" | "Inactive"
}

export default function TenantsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(3)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [subscriptionFilter, setSubscriptionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [perPage, setPerPage] = useState("10")
  const [createTenantOpen, setCreateTenantOpen] = useState(false)
  const [newTenant, setNewTenant] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    subscription: "Starter Plan",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Mock data for tenants
  const tenants: Tenant[] = [
    {
      id: "5405TDCC",
      name: "The smart bridge PVT. LTD",
      createdOn: "20-08-2023",
      subscription: "Starter Plan",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Active",
    },
    {
      id: "5405TDCC",
      name: "The smart bridge PVT. LTD",
      createdOn: "20-08-2023",
      subscription: "Starter Plan",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Inactive",
    },
    {
      id: "5405TDCC",
      name: "The smart bridge PVT. LTD",
      createdOn: "20-08-2023",
      subscription: "Starter Plan",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Active",
    },
    {
      id: "5405TDCC",
      name: "The smart bridge PVT. LTD",
      createdOn: "20-08-2023",
      subscription: "Starter Plan",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Active",
    },
    {
      id: "5405TDCC",
      name: "The smart bridge PVT. LTD",
      createdOn: "20-08-2023",
      subscription: "Starter Plan",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Active",
    },
  ]

  // Filter tenants based on search query and filters
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      searchQuery === "" ||
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubscription = subscriptionFilter === "all" || tenant.subscription === subscriptionFilter

    const matchesStatus = statusFilter === "all" || tenant.status === statusFilter

    return matchesSearch && matchesSubscription && matchesStatus
  })

  // Handle row selection
  const toggleRowSelection = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedRows.length === filteredTenants.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredTenants.map((tenant) => tenant.id))
    }
  }

  // Handle send bulk mail
  const handleSendBulkMail = () => {
    alert(`Sending bulk mail to ${selectedRows.length} tenants`)
    // Implement your bulk mail logic here
  }

  // Handle delete bulk
  const handleDeleteBulk = () => {
    alert(`Deleting ${selectedRows.length} tenants`)
    // Implement your bulk delete logic here
  }

  // Handle create tenant
  const handleCreateTenant = () => {
    alert("Creating new tenant: " + JSON.stringify(newTenant))
    setCreateTenantOpen(false)
    setNewTenant({
      name: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      subscription: "Starter Plan",
    })
  }

  // Handle input change for new tenant form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTenant({
      ...newTenant,
      [name]: value,
    })
  }

  // Navigate to tenant details page
  const navigateToTenantDetails = (id: string) => {
    router.push(`/admin/dashboard/tenants/${id}`)
  }

  return (
    <PageTransition>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tenants Management</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCreateTenantOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Tenant
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Crown className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">305</div>
              <div className="text-sm text-gray-500">Total Tenants</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">4502</div>
              <div className="text-sm text-gray-500">Total Candidates</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <GraduationCapIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">2540</div>
              <div className="text-sm text-gray-500">Candidates Attempted</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">40%</div>
              <div className="text-sm text-gray-500">Candidates Attempted</div>
            </div>
          </motion.div>
        </div>

        {/* Bulk Actions */}
        <div className="flex gap-4 mb-6">
          {selectedRows.length > 0 && (
            <>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSendBulkMail}>
                <Mail className="mr-2 h-4 w-4" /> Send Bulk Mail
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleDeleteBulk}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Bulk
              </Button>
            </>
          )}

          <Select value={perPage} onValueChange={setPerPage}>
            <SelectTrigger className="w-[100px] bg-white">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>

          <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Subscription wise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subscriptions</SelectItem>
              <SelectItem value="Starter Plan">Starter Plan</SelectItem>
              <SelectItem value="Premium Plan">Premium Plan</SelectItem>
              <SelectItem value="Enterprise Plan">Enterprise Plan</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Status Wise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10 bg-white w-[300px]"
              placeholder="Search User"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <Card className="mb-6 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedRows.length === filteredTenants.length && filteredTenants.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Tenant ID</TableHead>
                  <TableHead>Tenant Name</TableHead>
                  <TableHead>Created on</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(tenant.id)}
                        onCheckedChange={() => toggleRowSelection(tenant.id)}
                      />
                    </TableCell>
                    <TableCell>{tenant.id}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => navigateToTenantDetails(tenant.id)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {tenant.name}
                      </button>
                    </TableCell>
                    <TableCell>{tenant.createdOn}</TableCell>
                    <TableCell>{tenant.subscription}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{tenant.contact.email}</div>
                        <div className="text-gray-500">M: {tenant.contact.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-md text-sm ${
                          tenant.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tenant.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" className="text-blue-600">
                          <Mail className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-blue-600">
                          <Eye className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-blue-600">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  stroke="#0066FF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 16V12"
                                  stroke="#0066FF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 8H12.01"
                                  stroke="#0066FF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56 p-0 shadow-lg rounded-lg border border-gray-100">
                            <div className="p-3 flex items-center justify-between border-b border-gray-100">
                              <span className="text-gray-700">Disable</span>
                              <Switch className="data-[state=checked]:bg-red-500" />
                            </div>
                            <div className="p-3 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                              <span className="text-gray-700">Edit</span>
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667L2 11.5ZM13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C11.9867 1.93333 11.5667 1.93333 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333Z"
                                    fill="#0066FF"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                              <span className="text-gray-700">Delete</span>
                              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 12.6667C4 13.4 4.6 14 5.33333 14H10.6667C11.4 14 12 13.4 12 12.6667V4.66667H4V12.6667ZM12.6667 2.66667H10.3333L9.66667 2H6.33333L5.66667 2.66667H3.33333V4H12.6667V2.66667Z"
                                    fill="#FF0000"
                                  />
                                </svg>
                              </div>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setCurrentPage(1)} isActive={currentPage === 1}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setCurrentPage(2)} isActive={currentPage === 2}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setCurrentPage(3)} isActive={currentPage === 3}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setCurrentPage(4)} isActive={currentPage === 4}>
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setCurrentPage(5)} isActive={currentPage === 5}>
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={() => setCurrentPage(Math.min(5, currentPage + 1))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Create Tenant Dialog */}
        <Dialog open={createTenantOpen} onOpenChange={setCreateTenantOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold flex justify-between items-center">
                Create Tenant
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCreateTenantOpen(false)}
                  className="h-6 w-6 rounded-full text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Name" name="name" value={newTenant.name} onChange={handleInputChange} />
              <Input placeholder="Mobile Number" name="mobile" value={newTenant.mobile} onChange={handleInputChange} />
              <Input
                placeholder="Email address"
                name="email"
                type="email"
                value={newTenant.email}
                onChange={handleInputChange}
              />
              <div className="relative">
                <Input
                  placeholder="Create Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={newTenant.password}
                  onChange={handleInputChange}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="relative">
                <Input
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={newTenant.confirmPassword}
                  onChange={handleInputChange}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Select
                value={newTenant.subscription}
                onValueChange={(value) => setNewTenant({ ...newTenant, subscription: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Subscription Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Starter Plan">Starter Plan</SelectItem>
                  <SelectItem value="Premium Plan">Premium Plan</SelectItem>
                  <SelectItem value="Enterprise Plan">Enterprise Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateTenantOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateTenant}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  )
}
