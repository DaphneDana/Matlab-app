"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, Play } from "lucide-react"
import { useRouter } from "next/navigation"

export default function InputPage() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [analysisType, setAnalysisType] = useState("")
  const [confidence, setConfidence] = useState([95])
  const [sampleSize, setSampleSize] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const runAnalysis = async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Simulate completion and redirect to results
          setTimeout(() => {
            setIsProcessing(false)
            router.push("/results/new")
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">New Analysis</h1>
            <p className="text-gray-600">Upload your data and configure analysis parameters</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* File Upload Section */}
            <div className="lg:col-span-2">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    Upload Data Files
                  </CardTitle>
                  <CardDescription>Drag and drop your files here, or click to browse</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Drag and Drop Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                      dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={handleFileInput}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".csv,.xlsx,.xls,.json,.txt"
                    />
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-gray-600">Supports CSV, Excel, JSON, and TXT files up to 50MB</p>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h4 className="font-medium text-gray-900">Uploaded Files</h4>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Parameters Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Parameters</CardTitle>
                  <CardDescription>Configure your analysis settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Analysis Type */}
                  <div className="space-y-2">
                    <Label htmlFor="analysis-type">Analysis Type</Label>
                    <Select value={analysisType} onValueChange={setAnalysisType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select analysis type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="descriptive">Descriptive Statistics</SelectItem>
                        <SelectItem value="correlation">Correlation Analysis</SelectItem>
                        <SelectItem value="regression">Regression Analysis</SelectItem>
                        <SelectItem value="clustering">Clustering</SelectItem>
                        <SelectItem value="timeseries">Time Series Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Confidence Level */}
                  <div className="space-y-3">
                    <Label>Confidence Level: {confidence[0]}%</Label>
                    <Slider
                      value={confidence}
                      onValueChange={setConfidence}
                      max={99}
                      min={80}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>80%</span>
                      <span>99%</span>
                    </div>
                  </div>

                  {/* Sample Size */}
                  <div className="space-y-2">
                    <Label htmlFor="sample-size">Sample Size (optional)</Label>
                    <Input
                      id="sample-size"
                      type="number"
                      placeholder="e.g., 1000"
                      value={sampleSize}
                      onChange={(e) => setSampleSize(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Run Analysis Button */}
              <Card>
                <CardContent className="pt-6">
                  {!isProcessing ? (
                    <Button
                      onClick={runAnalysis}
                      disabled={files.length === 0 || !analysisType}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                      size="lg"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Run Analysis
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-blue-600">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="font-medium">Processing...</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-gray-600 text-center">
                        {progress < 30 && "Uploading and validating files..."}
                        {progress >= 30 && progress < 70 && "Running analysis..."}
                        {progress >= 70 && progress < 100 && "Generating results..."}
                        {progress >= 100 && "Complete!"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
