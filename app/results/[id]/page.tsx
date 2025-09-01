"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Download,
  FileText,
  Settings,
  History,
  TrendingUp,
  Table,
  ImageIcon,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for charts
const barData = [
  { name: "Jan", value: 4000, growth: 2400 },
  { name: "Feb", value: 3000, growth: 1398 },
  { name: "Mar", value: 2000, growth: 9800 },
  { name: "Apr", value: 2780, growth: 3908 },
  { name: "May", value: 1890, growth: 4800 },
  { name: "Jun", value: 2390, growth: 3800 },
]

const lineData = [
  { name: "Week 1", users: 1200, sessions: 2400 },
  { name: "Week 2", users: 1900, sessions: 1398 },
  { name: "Week 3", users: 800, sessions: 9800 },
  { name: "Week 4", users: 1780, sessions: 3908 },
]

const pieData = [
  { name: "Desktop", value: 45, color: "#3B82F6" },
  { name: "Mobile", value: 35, color: "#10B981" },
  { name: "Tablet", value: 20, color: "#F59E0B" },
]

const tableData = [
  { id: 1, category: "Electronics", revenue: 45000, growth: "+12%", status: "High" },
  { id: 2, category: "Clothing", revenue: 32000, growth: "+8%", status: "Medium" },
  { id: 3, category: "Books", revenue: 18000, growth: "-2%", status: "Low" },
  { id: 4, category: "Home & Garden", revenue: 28000, growth: "+15%", status: "High" },
  { id: 5, category: "Sports", revenue: 22000, growth: "+5%", status: "Medium" },
]

export default function ResultDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("charts")

  // Mock analysis data
  const analysis = {
    id: params.id,
    title: "Sales Data Q4 2024",
    date: "2024-01-15",
    status: "completed",
    type: "Descriptive Statistics",
    fileName: "sales_q4.csv",
    recordCount: 15420,
    processingTime: "2.3 seconds",
  }

  const sidebarItems = [
    { id: "inputs", label: "Inputs", icon: FileText },
    { id: "results", label: "Results", icon: BarChart3, active: true },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Navigation</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      item.active ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h1 className="text-3xl font-bold text-gray-900">{analysis.title}</h1>
                    <Badge className="bg-green-100 text-green-800 border-green-200">{analysis.status}</Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {analysis.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {analysis.fileName}
                    </span>
                    <span>{analysis.recordCount.toLocaleString()} records</span>
                    <span>Processed in {analysis.processingTime}</span>
                  </div>
                </div>
              </div>

              {/* Success Alert */}
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Analysis completed successfully! Your results are ready for review.
                </AlertDescription>
              </Alert>
            </div>

            {/* Results Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="charts" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Charts
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <Table className="h-4 w-4" />
                  Data Table
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </TabsTrigger>
              </TabsList>

              {/* Charts Tab */}
              <TabsContent value="charts" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Bar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Revenue Trends</CardTitle>
                      <CardDescription>Revenue and growth comparison by month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#3B82F6" />
                          <Bar dataKey="growth" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Line Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>User Engagement</CardTitle>
                      <CardDescription>Weekly users and sessions over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                          <Line type="monotone" dataKey="sessions" stroke="#10B981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Device Distribution</CardTitle>
                      <CardDescription>Traffic breakdown by device type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Summary Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Metrics</CardTitle>
                      <CardDescription>Summary statistics from your analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">$125K</div>
                          <div className="text-sm text-gray-600">Total Revenue</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">+12%</div>
                          <div className="text-sm text-gray-600">Growth Rate</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">4.2K</div>
                          <div className="text-sm text-gray-600">Avg. Users</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">98.5%</div>
                          <div className="text-sm text-gray-600">Accuracy</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Table Tab */}
              <TabsContent value="table">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Results</CardTitle>
                    <CardDescription>Complete data table with sortable columns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left p-3 font-semibold text-gray-900">Category</th>
                            <th className="text-left p-3 font-semibold text-gray-900">Revenue</th>
                            <th className="text-left p-3 font-semibold text-gray-900">Growth</th>
                            <th className="text-left p-3 font-semibold text-gray-900">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row) => (
                            <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="p-3 text-gray-900">{row.category}</td>
                              <td className="p-3 text-gray-900">${row.revenue.toLocaleString()}</td>
                              <td
                                className={`p-3 font-medium ${row.growth.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                              >
                                {row.growth}
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    row.status === "High"
                                      ? "border-green-200 text-green-800 bg-green-50"
                                      : row.status === "Medium"
                                        ? "border-yellow-200 text-yellow-800 bg-yellow-50"
                                        : "border-red-200 text-red-800 bg-red-50"
                                  }
                                >
                                  {row.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Export Tab */}
              <TabsContent value="export">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Results</CardTitle>
                    <CardDescription>Download your analysis results in various formats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button className="flex items-center gap-2 h-20 flex-col bg-blue-600 hover:bg-blue-700">
                        <FileText className="h-6 w-6" />
                        <span>Export CSV</span>
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2 h-20 flex-col bg-transparent">
                        <FileText className="h-6 w-6" />
                        <span>Export PDF</span>
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2 h-20 flex-col bg-transparent">
                        <ImageIcon className="h-6 w-6" />
                        <span>Export Images</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
