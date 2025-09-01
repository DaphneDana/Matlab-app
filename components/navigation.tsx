"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Home, Upload, FileText, History, Settings } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "New Analysis", href: "/input", icon: Upload },
  { name: "Results", href: "/results", icon: BarChart3 },
  { name: "History", href: "/history", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DataViz Pro</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href === "/results" && pathname.startsWith("/results"))

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2",
                      isActive
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button - placeholder for future implementation */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <FileText className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
