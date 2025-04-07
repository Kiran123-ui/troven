"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { User, LinkIcon, Image, Shield, Pencil, Cloud, CreditCard, Clock, Package, FileText, Download, ExternalLink,Badge } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

// Add form types
type AccountFormValues = {
  email: string;
  password: string;
  mobile: string;
}

type LogoFormValues = {
  logo: FileList | null;
}

type MfaFormValues = {
  enabled: boolean;
  method: 'app' | 'sms' | 'email';
}

type ApiIntegrationFormValues = {
  apiKey: string;
  webhookUrl: string;
}

type SubscriptionFormValues = {
  plan: 'basic' | 'pro' | 'enterprise';
  billingCycle: 'monthly' | 'yearly';
}

// Component for profile page navigation items
function ProfileNavItem({ icon, label, active = false, onClick = () => {} }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-3 w-full rounded-md transition-colors ${
          active ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600" : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    </li>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Account")
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add React Hook Form
  const { register: registerAccount, handleSubmit: handleAccountSubmit, formState: { errors: accountErrors } } = 
    useForm<AccountFormValues>({
      defaultValues: {
        email: "sanjay@thesmartbridge.com",
        password: "password123",
        mobile: "9979409958"
      }
    });

  const { register: registerLogo, handleSubmit: handleLogoSubmit } = useForm<LogoFormValues>();

  const { register: registerMfa, handleSubmit: handleMfaSubmit } = useForm<MfaFormValues>({
    defaultValues: {
      enabled: false,
      method: 'app'
    }
  });

  const { register: registerApi, handleSubmit: handleApiSubmit } = useForm<ApiIntegrationFormValues>();

  const { register: registerSubscription, handleSubmit: handleSubscriptionSubmit } = useForm<SubscriptionFormValues>({
    defaultValues: {
      plan: 'pro',
      billingCycle: 'monthly'
    }
  });

  const onAccountSubmit = (data: AccountFormValues) => {
    console.log("Account form submitted:", data);
    // Handle account update API call
  };

  const onLogoSubmit = (data: LogoFormValues) => {
    console.log("Logo form submitted:", data);
    // Handle logo upload API call
  };

  const onMfaSubmit = async (data: MfaFormValues) => {
    try {
      console.log("MFA settings updated:", data);
      // await updateMfaSettings(data);
    } catch (error) {
      console.error("Failed to update MFA settings:", error);
    }
  };

  const onApiSubmit = async (data: ApiIntegrationFormValues) => {
    try {
      console.log("API settings updated:", data);
      // await updateApiSettings(data);
    } catch (error) {
      console.error("Failed to update API settings:", error);
    }
  };

  const onSubscriptionSubmit = async (data: SubscriptionFormValues) => {
    try {
      console.log("Subscription updated:", data);
      // await updateSubscription(data);
    } catch (error) {
      console.error("Failed to update subscription:", error);
    }
  };

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedLogo(URL.createObjectURL(file))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedLogo(URL.createObjectURL(file))
    }
  }

  // Update the API & Integrations tab content
  const renderApiIntegrationsContent = () => (
    <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
      <form onSubmit={handleApiSubmit(onApiSubmit)}>
        <h2 className="text-2xl font-bold mb-8">API & Integrations</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">API Key</label>
            <div className="flex gap-2">
              <Input 
                {...registerApi("apiKey")}
                type="password" 
                className="font-mono"
                readOnly
              />
              <Button type="button" variant="outline">
                Regenerate
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Webhook URL</label>
            <Input 
              {...registerApi("webhookUrl")} 
              type="url" 
              placeholder="https://your-domain.com/webhook"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
      </form>
    </motion.div>
  );

  // Update the MFA tab content
  const renderMfaContent = () => (
    <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
      <form onSubmit={handleMfaSubmit(onMfaSubmit)}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">MFA Settings</h2>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...registerMfa("enabled")}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
            />
            <label className="text-sm text-gray-600">Enable MFA</label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Authentication Method</label>
            <select
              {...registerMfa("method")}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="app">Authenticator App</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
      </form>
    </motion.div>
  );

  // Render the appropriate content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Account":
        return (
          <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-8">Account Setting</h2>

            <form onSubmit={handleAccountSubmit(onAccountSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input 
                  {...registerAccount("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`border-gray-300 ${accountErrors.email ? "border-red-500" : ""}`}
                />
                {accountErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{accountErrors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Input 
                    type="password"
                    {...registerAccount("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
                    className={`border-gray-300 ${accountErrors.password ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                {accountErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{accountErrors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mobile</label>
                <Input 
                  {...registerAccount("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid mobile number"
                    }
                  })}
                  className={`border-gray-300 ${accountErrors.mobile ? "border-red-500" : ""}`}
                />
                {accountErrors.mobile && (
                  <p className="text-red-500 text-xs mt-1">{accountErrors.mobile.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <Button type="button" variant="outline" className="px-6">Cancel</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">Save</Button>
              </div>
            </form>
          </motion.div>
        )

      case "Logos":
        return (
          <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
            <form onSubmit={handleLogoSubmit(onLogoSubmit)}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Logo Setting</h2>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="px-6 rounded-full">Cancel</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 rounded-full">Save</Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mt-12">
                <div
                  className="border-2 border-dashed border-gray-300 p-6 rounded-md flex flex-col items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {selectedLogo ? (
                    <img src={selectedLogo} alt="Selected Logo" className="h-24 w-24 object-contain mb-4" />
                  ) : (
                    <p className="text-gray-500">Drag and drop a logo here, or click to select a file</p>
                  )}
                  <input
                    type="file"
                    {...registerLogo("logo")}
                    ref={(e) => {
                      registerLogo("logo").ref(e);
                      fileInputRef.current = e;
                    }}
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Logo
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        )

      case "API & Integations":
        return renderApiIntegrationsContent();
      case "MFA":
        return renderMfaContent();
      case "Subscription":
        return (
          <motion.div className="md:col-span-2 bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Subscription</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 px-6">Upgrade Plan</Button>
            </div>

            {/* Current Plan */}
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Pro Plan</h3>
                  <p className="text-blue-700">$49/month</p>
                </div>
                <Badge className="bg-blue-200 text-blue-800">Current Plan</Badge>
              </div>
              <div className="mt-4 text-blue-700">
                <p>Next billing date: July 1, 2024</p>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={20} className="text-gray-600" />
                  <h4 className="font-medium">Assessments</h4>
                </div>
                <p className="text-2xl font-bold">245/500</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '49%' }}></div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Download size={20} className="text-gray-600" />
                  <h4 className="font-medium">Storage</h4>
                </div>
                <p className="text-2xl font-bold">2.1/5 GB</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={20} className="text-gray-600" />
                  <h4 className="font-medium">API Calls</h4>
                </div>
                <p className="text-2xl font-bold">8.2k/10k</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Payment History</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { date: 'June 1, 2024', amount: '$49.00', status: 'Paid' },
                      { date: 'May 1, 2024', amount: '$49.00', status: 'Paid' },
                      { date: 'April 1, 2024', amount: '$49.00', status: 'Paid' },
                    ].map((payment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            <ExternalLink size={16} className="mr-1" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Billing Information</h3>
                <Button variant="outline" size="sm">
                  <CreditCard size={16} className="mr-2" />
                  Update
                </Button>
              </div>
              <div className="flex gap-4">
                <CreditCard className="text-gray-400" size={32} />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/2025</p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
        {/* Left column - Profile info and navigation */}
        <motion.div className="bg-white rounded-md shadow-sm border border-gray-200 p-6" variants={itemVariants}>
          <div className="flex flex-col items-center mb-6 relative">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 border-2 border-gray-200">
                <AvatarImage src="/placeholder-user.jpg" alt="Sanjay Beri" />
                <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">SB</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">Sanjay Beri</h2>
            <p className="text-gray-500 text-sm">Super admin</p>
          </div>

          <nav className="mt-6">
            <ul className="space-y-1">
              <ProfileNavItem
                icon={<User size={18} />}
                label="Account"
                active={activeTab === "Account"}
                onClick={() => setActiveTab("Account")}
              />
              <ProfileNavItem
                icon={<LinkIcon size={18} />}
                label="API & Integations"
                active={activeTab === "API & Integations"}
                onClick={() => setActiveTab("API & Integations")}
              />
              <ProfileNavItem
                icon={<Image size={18} />}
                label="Logos"
                active={activeTab === "Logos"}
                onClick={() => setActiveTab("Logos")}
              />
              <ProfileNavItem
                icon={<Shield size={18} />}
                label="MFA"
                active={activeTab === "MFA"}
                onClick={() => setActiveTab("MFA")}
              />
              <ProfileNavItem
                icon={<CreditCard size={18} />}
                label="Subscription"
                active={activeTab === "Subscription"}
                onClick={() => setActiveTab("Subscription")}
              />
            </ul>
          </nav>
        </motion.div>

        {/* Right column - Content based on selected tab */}
        {renderContent()}
      </motion.div>
    </motion.div>
  )
}

