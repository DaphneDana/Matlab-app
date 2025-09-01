"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Upload, Play, Download, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function HomePage() {
  const [inputValue, setInputValue] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [progress, setProgress] = useState(0)

  // Mock history data for sidebar
  const recentRuns = [
    {
      id: 1,
      input: "Dataset_A.csv",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      input: "Analysis_B.xlsx",
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      input: "Survey_Data.csv",
      timestamp: "2 days ago",
      status: "failed",
    },
  ]

  // Mock chart data
  const chartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 700 },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleRunAnalysis = async () => {
    if (!inputValue.trim() && !uploadedFile) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setHasResults(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const canRun = inputValue.trim() || uploadedFile

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* History Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">Recent Runs</h2>
          </div>

          <div className="space-y-3">
            {recentRuns.map((run) => (
              <Card key={run.id} className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 truncate">{run.input}</span>
                  {run.status === "completed" ? (
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500">{run.timestamp}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">Computational Analysis Tool</h1>
            </div>
            <p className="text-gray-600">Enter your parameters and run analysis to get insights</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Input Parameters
                </CardTitle>
                <CardDescription>Provide the required input values to run your analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Numeric Input */}
                  <div className="space-y-2">
                    <Label htmlFor="input-value">Enter Input Value</Label>
                    <Input
                      id="input-value"
                      type="number"
                      placeholder="e.g., 42"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full"
                    />
                    {!inputValue.trim() && !uploadedFile && (
                      <p className="text-sm text-red-600">Input required before running</p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload Data File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".csv,.xlsx,.txt"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        {uploadedFile ? (
                          <p className="text-sm text-green-600">{uploadedFile.name}</p>
                        ) : (
                          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Run Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleRunAnalysis}
                    disabled={!canRun || isProcessing}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {isProcessing ? "Processing..." : "Run Analysis"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Processing Section */}
            {isProcessing && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600">Processing your analysis...</p>
                    <Progress value={progress} className="w-full max-w-md mx-auto" />
                    <p className="text-sm text-gray-500">{progress}% complete</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Section */}
            {hasResults && !isProcessing && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Analysis Results
                      </span>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Results
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Input Summary */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Input Summary</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Input Value:</strong> {inputValue || "N/A"}
                        </p>
                        {uploadedFile && (
                          <p className="text-sm text-gray-700">
                            <strong>File:</strong> {uploadedFile.name}
                          </p>
                        )}
                        <p className="text-sm text-gray-700">
                          <strong>Processed:</strong> {new Date().toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Mock Results */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Output Results</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Text Results */}
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Key Metrics</h4>
                            <div className="space-y-2 text-sm">
                              <p>
                                <strong>Mean:</strong> 542.3
                              </p>
                              <p>
                                <strong>Standard Deviation:</strong> 127.8
                              </p>
                              <p>
                                <strong>Correlation:</strong> 0.847
                              </p>
                              <p>
                                <strong>R-squared:</strong> 0.923
                              </p>
                            </div>
                          </div>

                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-medium text-green-900 mb-2">Status</h4>
                            <Badge className="bg-green-100 text-green-800">Analysis Completed Successfully</Badge>
                          </div>
                        </div>

                        {/* Chart Visualization */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Data Visualization</h4>
                          <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
