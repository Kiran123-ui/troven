"use client"

import type React from "react"

import { useState } from "react"
import { PageTransition } from "../components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Search, Plus, Eye, Trash2, X, EyeOff, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define user data type
interface User {
  id: string
  name: string
  avatar: string
  addedOn: string
  role: string
  contact: {
    email: string
    phone: string
  }
  status: "Active" | "Inactive"
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(3)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [perPage, setPerPage] = useState("10")
  const [createUserOpen, setCreateUserOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "",
    access: {
      dashboard: true,
      userManagement: true,
      auditTrails: true,
      accessControl: true,
      dataManagement: true,
    },
  })

  // Mock data for users
  const users: User[] = [
    {
      id: "1",
      name: "Jayesh Rama Reddy",
      avatar: "/placeholder-user.jpg",
      addedOn: "20-08-2023",
      role: "Super Admin",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Active",
    },
    {
      id: "2",
      name: "Jayesh Rama Reddy",
      avatar: "/placeholder-user.jpg",
      addedOn: "20-08-2023",
      role: "Super Admin",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Active",
    },
    {
      id: "3",
      name: "Jayesh Rama Reddy",
      avatar: "/placeholder-user.jpg",
      addedOn: "20-08-2023",
      role: "Super Admin",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Active",
    },
    {
      id: "4",
      name: "Jayesh Rama Reddy",
      avatar: "/placeholder-user.jpg",
      addedOn: "20-08-2023",
      role: "Super Admin",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Active",
    },
    {
      id: "5",
      name: "Jayesh Rama Reddy",
      avatar: "/placeholder-user.jpg",
      addedOn: "20-08-2023",
      role: "Super Admin",
      contact: {
        email: "sanjay@thesmartbridge.com",
        phone: "99794 09958",
      },
      status: "Active",
    },
  ]

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contact.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
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
    if (selectedRows.length === filteredUsers.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredUsers.map((user) => user.id))
    }
  }

  // Handle send bulk mail
  const handleSendBulkMail = () => {
    alert(`Sending bulk mail to ${selectedRows.length} users`)
    // Implement your bulk mail logic here
  }

  // Handle delete bulk
  const handleDeleteBulk = () => {
    alert(`Deleting ${selectedRows.length} users`)
    // Implement your bulk delete logic here
  }

  // Handle create user
  const handleCreateUser = () => {
    alert("Creating new user: " + JSON.stringify(newUser))
    setCreateUserOpen(false)
    setNewUser({
      name: "",
      mobile: "",
      email: "",
      password: "",
      role: "",
      access: {
        dashboard: true,
        userManagement: true,
        auditTrails: true,
        accessControl: true,
        dataManagement: true,
      },
    })
  }

  // Handle input change for new user form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser({
      ...newUser,
      [name]: value,
    })
  }

  // Generate random password
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewUser({
      ...newUser,
      password,
    })
  }

  // Toggle access permission
  const toggleAccess = (key: keyof typeof newUser.access) => {
    setNewUser({
      ...newUser,
      access: {
        ...newUser.access,
        [key]: !newUser.access[key],
      },
    })
  }

  return (
    <PageTransition>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCreateUserOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create User
          </Button>
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

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Role Wise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Super Admin">Super Admin</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="User">User</SelectItem>
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
        <div className="bg-white rounded-lg overflow-hidden mb-6">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedRows.length === filteredUsers.length && filteredUsers.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Added on</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(user.id)}
                      onCheckedChange={() => toggleRowSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.addedOn}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.contact.email}</div>
                      <div className="text-gray-500">M: {user.contact.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon" className="text-blue-600">
                        <Mail className="h-5 w-5" />
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
                      <Button variant="ghost" size="icon" className="text-blue-600">
                        <Eye className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                className={currentPage === page ? "bg-blue-600 text-white" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Create User Dialog */}
        <Dialog open={createUserOpen} onOpenChange={setCreateUserOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold flex justify-between items-center">
                Create User
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCreateUserOpen(false)}
                  className="h-6 w-6 rounded-full text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Name" name="name" value={newUser.name} onChange={handleInputChange} />
              <Input placeholder="Mobile Number" name="mobile" value={newUser.mobile} onChange={handleInputChange} />
              <Input
                placeholder="Email address"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Create Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={newUser.password}
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
                <Button className="bg-green-600 hover:bg-green-700" onClick={generatePassword}>
                  Generate Password
                </Button>
              </div>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <h3 className="font-medium">User Access</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dashboard"
                        checked={newUser.access.dashboard}
                        onCheckedChange={() => toggleAccess("dashboard")}
                      />
                      <label
                        htmlFor="dashboard"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Dashboard
                      </label>
                    </div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="userManagement"
                        checked={newUser.access.userManagement}
                        onCheckedChange={() => toggleAccess("userManagement")}
                      />
                      <label
                        htmlFor="userManagement"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        User Management
                      </label>
                    </div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="auditTrails"
                        checked={newUser.access.auditTrails}
                        onCheckedChange={() => toggleAccess("auditTrails")}
                      />
                      <label
                        htmlFor="auditTrails"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Audit Trails
                      </label>
                    </div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="accessControl"
                        checked={newUser.access.accessControl}
                        onCheckedChange={() => toggleAccess("accessControl")}
                      />
                      <label
                        htmlFor="accessControl"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Access Control
                      </label>
                    </div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dataManagement"
                        checked={newUser.access.dataManagement}
                        onCheckedChange={() => toggleAccess("dataManagement")}
                      />
                      <label
                        htmlFor="dataManagement"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Data Management
                      </label>
                    </div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dataManagement2"
                        checked={newUser.access.dataManagement}
                        onCheckedChange={() => toggleAccess("dataManagement")}
                      />
                      <label
                        htmlFor="dataManagement2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Data Management
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateUserOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateUser}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  )
}
