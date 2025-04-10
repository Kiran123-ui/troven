"use client"

import { useState } from "react"
import { PageTransition } from "../components/page-transition"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ExternalLink } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Service interface
interface Service {
  id: string
  title: string
  description: string
  isAddOn: boolean
  creditsRequired: boolean
}

export default function ServicesPage() {
  const [createServiceOpen, setCreateServiceOpen] = useState(false)
  const [roleFilter, setRoleFilter] = useState("Role Wise")
  const [statusFilter, setStatusFilter] = useState("Status Wise")
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    isAddOn: false,
    creditsRequired: false,
  })

  // Mock services data
  const services: Service[] = Array(9)
    .fill(null)
    .map((_, index) => ({
      id: `service-${index + 1}`,
      title: "Assessments Creation",
      description:
        "lock Success with Expert Assessments Creation Services. Tailored, Reliable, Innovative, Results-Driven, and Customized Solutions for Your Unique Assessment Needs.",
      isAddOn: Math.random() > 0.5,
      creditsRequired: index === 0 || index === 4,
    }))

  // Handle create service
  const handleCreateService = () => {
    alert("Creating new service: " + JSON.stringify(newService))
    setCreateServiceOpen(false)
    setNewService({
      title: "",
      description: "",
      isAddOn: false,
      creditsRequired: false,
    })
  }

  return (
    <PageTransition>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services Management</h1>
          <div className="flex gap-3">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px] bg-white border border-gray-200">
                <SelectValue placeholder="Role Wise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Role Wise">Role Wise</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Guest">Guest</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-white border border-gray-200">
                <SelectValue placeholder="Status Wise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Status Wise">Status Wise</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCreateServiceOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Service
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full border-red-200 text-red-500 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-blue-200 text-blue-500 h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  {service.creditsRequired && (
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                      Credits Required
                    </div>
                  )}
                  <div
                    className={`flex items-center gap-2 ml-auto ${service.creditsRequired ? "" : "w-full justify-end"}`}
                  >
                    <span className="text-sm text-gray-600">Add-On As Service</span>
                    <Switch checked={service.isAddOn} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Service Dialog */}
        <Dialog open={createServiceOpen} onOpenChange={setCreateServiceOpen}>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-lg">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Create New Service</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCreateServiceOpen(false)}
                className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#FF0000" strokeWidth="1.5" />
                  <path d="M15 9L9 15M9 9L15 15" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Button>
            </div>

            <div className="p-5 space-y-4">
              {/* Name input */}
              <Input
                placeholder="Name"
                className="w-full border border-gray-200 rounded-md"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
              />

              {/* Description input */}
              <Textarea
                placeholder="Description"
                className="w-full border border-gray-200 rounded-md"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              />

              {/* Toggle switches */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Label htmlFor="add-on-service" className="text-gray-700">
                    Add-On As Service
                  </Label>
                  <Switch
                    id="add-on-service"
                    checked={newService.isAddOn}
                    onCheckedChange={(checked) => setNewService({ ...newService, isAddOn: checked })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="credits-required" className="text-gray-700">
                    Credits Required
                  </Label>
                  <Switch
                    id="credits-required"
                    checked={newService.creditsRequired}
                    onCheckedChange={(checked) => setNewService({ ...newService, creditsRequired: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setCreateServiceOpen(false)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateService}>
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  )
}
