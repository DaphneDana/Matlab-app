"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  RotateCcw,
  Trash2,
  Calendar,
  FileText,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock historical data
  const allAnalyses = [
    {
      id: 1,
      title: "Sales Data Q4 2024",
      date: "2024-01-15",
      time: "14:30",
      status: "completed",
      type: "Descriptive Statistics",
      fileName: "sales_q4.csv",
      recordCount: 15420,
      processingTime: "2.3s",
    },
    {
      id: 2,
      title: "Customer Behavior Analysis",
      date: "2024-01-14",
      time: "09:15",
      status: "completed",
      type: "Correlation Analysis",
      fileName: "customer_data.xlsx",
      recordCount: 8750,
      processingTime: "4.1s",
    },
    {
      id: 3,
      title: "Market Research Survey",
      date: "2024-01-13",
      time: "16:45",
      status: "failed",
      type: "Clustering",
      fileName: "survey_results.csv",
      recordCount: 0,
      processingTime: "0.5s",
    },
    {
      id: 4,
      title: "Product Performance Metrics",
      date: "2024-01-12",
      time: "11:20",
      status: "completed",
      type: "Time Series Analysis",
      fileName: "product_metrics.json",
      recordCount: 2340,
      processingTime: "6.8s",
    },
    {
      id: 5,
      title: "Website Traffic Analysis",
      date: "2024-01-11",
      time: "08:45",
      status: "completed",
      type: "Descriptive Statistics",
      fileName: "traffic_data.csv",
      recordCount: 12500,
      processingTime: "3.2s",
    },
    {
      id: 6,
      title: "Email Campaign Results",
      date: "2024-01-10",
      time: "15:30",
      status: "processing",
      type: "Regression Analysis",
      fileName: "email_metrics.xlsx",
      recordCount: 5600,
      processingTime: "ongoing",
    },
    {
      id: 7,
      title: "Social Media Engagement",
      date: "2024-01-09",
      time: "13:15",
      status: "failed",
      type: "Correlation Analysis",
      fileName: "social_data.json",
      recordCount: 0,
      processingTime: "1.2s",
    },
    {
      id: 8,
      title: "Inventory Optimization",
      date: "2024-01-08",
      time: "10:00",
      status: "completed",
      type: "Clustering",
      fileName: "inventory.csv",
      recordCount: 3400,
      processingTime: "5.5s",
    },
  ]

  // Filter analyses based on search and filters
  const filteredAnalyses = allAnalyses.filter((analysis) => {
    const matchesSearch =
      analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || analysis.status === statusFilter
    const matchesType = typeFilter === "all" || analysis.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800 border-green-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }

    return (
      <Badge
        variant="outline"
        className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800 border-gray-200"}
      >
        {status}
      </Badge>
    )
  }

  const handleDelete = (id: number) => {
    // In a real app, this would make an API call to delete the analysis
    console.log(`Deleting analysis ${id}`)
  }

  const handleRerun = (id: number) => {
    // In a real app, this would trigger a rerun of the analysis
    console.log(`Re-running analysis ${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis History</h1>
            <p className="text-gray-600">View, manage, and re-run your past analyses</p>
          </div>

          {/* Filters and Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search analyses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Descriptive Statistics">Descriptive Statistics</SelectItem>
                    <SelectItem value="Correlation Analysis">Correlation Analysis</SelectItem>
                    <SelectItem value="Regression Analysis">Regression Analysis</SelectItem>
                    <SelectItem value="Clustering">Clustering</SelectItem>
                    <SelectItem value="Time Series Analysis">Time Series Analysis</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-gray-600 flex items-center">
                  Showing {filteredAnalyses.length} of {allAnalyses.length} analyses
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>Complete record of all your data analyses</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredAnalyses.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-4 font-semibold text-gray-900">Analysis</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Date & Time</th>
                        <th className="text-left p-4 font-semibold text-gray-900">File</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Type</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Records</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAnalyses.map((analysis) => (
                        <tr key={analysis.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(analysis.status)}
                              <div>
                                <div className="font-medium text-gray-900">{analysis.title}</div>
                                <div className="text-sm text-gray-600">Processing time: {analysis.processingTime}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-gray-900">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{analysis.date}</span>
                            </div>
                            <div className="text-sm text-gray-600">{analysis.time}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-gray-900">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span className="font-mono text-sm">{analysis.fileName}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-gray-700">{analysis.type}</span>
                          </td>
                          <td className="p-4">{getStatusBadge(analysis.status)}</td>
                          <td className="p-4">
                            <span className="text-gray-900">
                              {analysis.recordCount > 0 ? analysis.recordCount.toLocaleString() : "-"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {analysis.status === "completed" && (
                                <Link href={`/results/${analysis.id}`}>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-blue-600 hover:text-blue-700 bg-transparent"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </Link>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRerun(analysis.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <RotateCcw className="h-4 w-4 mr-1" />
                                Re-run
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 bg-transparent"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Analysis</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{analysis.title}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(analysis.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No analyses found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "You haven't run any analyses yet"}
                  </p>
                  {!searchTerm && statusFilter === "all" && typeFilter === "all" && (
                    <Link href="/input">
                      <Button className="bg-blue-600 hover:bg-blue-700">Start Your First Analysis</Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
