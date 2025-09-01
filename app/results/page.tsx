import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, FileText, Calendar, CheckCircle, XCircle, Eye } from "lucide-react"
import Link from "next/link"

export default function ResultsPage() {
  // Mock results data
  const analyses = [
    {
      id: 1,
      title: "Sales Data Q4 2024",
      date: "2024-01-15",
      status: "completed",
      type: "Descriptive Statistics",
      fileName: "sales_q4.csv",
      recordCount: 15420,
    },
    {
      id: 2,
      title: "Customer Behavior Analysis",
      date: "2024-01-14",
      status: "completed",
      type: "Correlation Analysis",
      fileName: "customer_data.xlsx",
      recordCount: 8750,
    },
    {
      id: 3,
      title: "Market Research Survey",
      date: "2024-01-13",
      status: "failed",
      type: "Clustering",
      fileName: "survey_results.csv",
      recordCount: 0,
    },
    {
      id: 4,
      title: "Product Performance Metrics",
      date: "2024-01-12",
      status: "completed",
      type: "Time Series Analysis",
      fileName: "product_metrics.json",
      recordCount: 2340,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800 border-green-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }

    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants] || variants.processing}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h1>
            <p className="text-gray-600">View and manage your completed analyses</p>
          </div>

          {/* Results Grid */}
          <div className="grid gap-6">
            {analyses.map((analysis) => (
              <Card key={analysis.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(analysis.status)}
                        <CardTitle className="text-xl">{analysis.title}</CardTitle>
                        {getStatusBadge(analysis.status)}
                      </div>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {analysis.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {analysis.fileName}
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4" />
                          {analysis.type}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {analysis.status === "completed" && (
                        <p>{analysis.recordCount.toLocaleString()} records processed</p>
                      )}
                      {analysis.status === "failed" && (
                        <p className="text-red-600">Analysis failed - check input data format</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {analysis.status === "completed" && (
                        <Link href={`/results/${analysis.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Eye className="mr-2 h-4 w-4" />
                            View Results
                          </Button>
                        </Link>
                      )}
                      <Button variant="outline" size="sm">
                        Re-run
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {analyses.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results yet</h3>
                <p className="text-gray-600 mb-6">Run your first analysis to see results here</p>
                <Link href="/input">
                  <Button className="bg-blue-600 hover:bg-blue-700">Start New Analysis</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
