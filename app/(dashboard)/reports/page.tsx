"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileText, Download, Calendar, Building2 } from "lucide-react"

const sections = [
  { id: "aqi-summary", label: "AQI Summary" },
  { id: "ward-analysis", label: "Ward Analysis" },
  { id: "health-advisory", label: "Health Advisory" },
  { id: "admin-actions", label: "Admin Actions" },
  { id: "pollution-sources", label: "Pollution Source Analysis" },
  { id: "forecast", label: "Forecast Data" },
]

export default function ReportsPage() {
  const [selectedSections, setSelectedSections] = useState<string[]>(
    sections.map((s) => s.id)
  )
  const [generating, setGenerating] = useState(false)

  const toggleSection = (id: string) => {
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          Report Generation
        </h1>
        <p className="text-xs text-muted-foreground">
          Generate comprehensive PDF reports for stakeholders and regulatory compliance
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* Report Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileText className="size-4 text-primary" />
              Report Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-secondary/30 p-6">
              {/* Mock report preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      VayuDrishti Air Quality Report
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Faridabad Municipal Corporation
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    Draft
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-card p-3">
                    <p className="text-[10px] font-medium text-muted-foreground">
                      Report Period
                    </p>
                    <p className="text-xs font-semibold text-foreground">
                      Feb 21 - Feb 28, 2026
                    </p>
                  </div>
                  <div className="rounded-md bg-card p-3">
                    <p className="text-[10px] font-medium text-muted-foreground">
                      City Average AQI
                    </p>
                    <p className="text-xs font-semibold text-foreground">156</p>
                  </div>
                  <div className="rounded-md bg-card p-3">
                    <p className="text-[10px] font-medium text-muted-foreground">
                      Wards Monitored
                    </p>
                    <p className="text-xs font-semibold text-foreground">8</p>
                  </div>
                  <div className="rounded-md bg-card p-3">
                    <p className="text-[10px] font-medium text-muted-foreground">
                      Actions Taken
                    </p>
                    <p className="text-xs font-semibold text-foreground">12</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-muted-foreground">
                    Included Sections
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSections.map((id) => {
                      const section = sections.find((s) => s.id === id)
                      return (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {section?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-md bg-primary/5 p-3">
                  <p className="text-[10px] text-muted-foreground">
                    This report will contain {selectedSections.length} sections
                    with data from 8 wards including AQI trends, pollutant
                    breakdowns, health advisories, and administrative actions
                    taken during the reporting period.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Config */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
                  City
                </label>
                <div className="flex items-center gap-2">
                  <Building2 className="size-3.5 text-muted-foreground" />
                  <Select defaultValue="faridabad">
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faridabad">Faridabad</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
                  Date Range
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  <Select defaultValue="week">
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-foreground">
                  Include Sections
                </label>
                {sections.map((section) => (
                  <div key={section.id} className="flex items-center gap-3">
                    <Checkbox
                      id={section.id}
                      checked={selectedSections.includes(section.id)}
                      onCheckedChange={() => toggleSection(section.id)}
                    />
                    <label
                      htmlFor={section.id}
                      className="text-xs text-foreground"
                    >
                      {section.label}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full gap-2"
            size="sm"
            onClick={handleGenerate}
            disabled={generating || selectedSections.length === 0}
          >
            <Download className="size-3.5" />
            {generating ? "Generating..." : "Generate PDF Report"}
          </Button>
        </div>
      </div>
    </div>
  )
}
