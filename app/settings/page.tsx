"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Palette, Shield, Database, Download, Trash2, Save, Moon, Sun, Monitor } from "lucide-react"

export default function SettingsPage() {
  const [theme, setTheme] = useState("system")
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [dataRetention, setDataRetention] = useState("90")
  const [exportFormat, setExportFormat] = useState("csv")

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    plan: "Pro",
    joinDate: "January 2024",
    analysesCount: 47,
    storageUsed: "2.3 GB",
    storageLimit: "10 GB",
  }

  const handleSaveSettings = () => {
    // In a real app, this would save settings to the backend
    console.log("Settings saved")
  }

  const handleExportData = () => {
    // In a real app, this would trigger data export
    console.log("Exporting user data")
  }

  const handleDeleteAccount = () => {
    // In a real app, this would trigger account deletion flow
    console.log("Account deletion requested")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and system configuration</p>
          </div>

          <div className="space-y-8">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Account Information
                </CardTitle>
                <CardDescription>Your account details and subscription information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={userData.name} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={userData.email} className="mt-1" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Current Plan</span>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">{userData.plan}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Member since: {userData.joinDate}</p>
                        <p>Analyses completed: {userData.analysesCount}</p>
                        <p>
                          Storage used: {userData.storageUsed} of {userData.storageLimit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline">Change Password</Button>
                </div>
              </CardContent>
            </Card>

            {/* User Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-blue-600" />
                  User Preferences
                </CardTitle>
                <CardDescription>Customize your experience and interface settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        theme === "light" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Sun className="h-5 w-5 mx-auto mb-2 text-yellow-500" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        theme === "dark" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Moon className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        theme === "system" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Monitor className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                      <span className="text-sm font-medium">System</span>
                    </button>
                  </div>
                </div>

                <Separator />

                {/* Notification Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive updates about your analyses</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Auto-save Results</Label>
                      <p className="text-sm text-gray-600">Automatically save analysis results</p>
                    </div>
                    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>
                </div>

                <Separator />

                {/* Default Export Format */}
                <div className="space-y-2">
                  <Label htmlFor="export-format" className="text-base font-medium">
                    Default Export Format
                  </Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* System Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  System Configuration
                </CardTitle>
                <CardDescription>Advanced settings and data management options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="data-retention" className="text-base font-medium">
                        Data Retention Period
                      </Label>
                      <Select value={dataRetention} onValueChange={setDataRetention}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">6 months</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-600 mt-1">How long to keep your analysis data and results</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">API Integration</h4>
                      <p className="text-sm text-gray-600 mb-3">Connect external data sources and services</p>
                      <Button variant="outline" size="sm" disabled>
                        Configure API Keys
                        <Badge variant="secondary" className="ml-2">
                          Coming Soon
                        </Badge>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Data Management
                </CardTitle>
                <CardDescription>Export your data or delete your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Export Your Data</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Download all your analyses, results, and account data
                      </p>
                      <Button onClick={handleExportData} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Delete Account</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Permanently delete your account and all associated data
                      </p>
                      <Button onClick={handleDeleteAccount} variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-5 w-5" />
                Save All Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
