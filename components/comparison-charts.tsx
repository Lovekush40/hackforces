"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, PieChart as PieChartIcon } from "lucide-react"
import { wards, pollutionSources } from "@/lib/mock-data"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts"

const metricColors: Record<string, string> = {
  AQI: "#3b82f6",
  "PM2.5": "#f97316",
  PM10: "#ef4444",
}

export function ComparisonCharts() {
  const [metric, setMetric] = useState<"AQI" | "PM2.5" | "PM10">("AQI")

  const top5 = wards
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 5)
    .map((w) => ({
      name: w.name,
      value: metric === "AQI" ? w.aqi : metric === "PM2.5" ? w.pm25 : w.pm10,
    }))

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <BarChart3 className="size-4 text-primary" />
              AQI Comparison - Top 5 Wards
            </CardTitle>
            <div className="flex gap-1">
              {(["AQI", "PM2.5", "PM10"] as const).map((m) => (
                <Button
                  key={m}
                  variant={metric === m ? "default" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-[10px]"
                  onClick={() => setMetric(m)}
                >
                  {m}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top5} layout="vertical" barSize={20}>
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {top5.map((_, i) => (
                    <Cell
                      key={i}
                      fill={metricColors[metric]}
                      opacity={1 - i * 0.15}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <PieChartIcon className="size-4 text-primary" />
            Pollution Cause Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pollutionSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  nameKey="name"
                  strokeWidth={2}
                  stroke="var(--color-card)"
                >
                  {pollutionSources.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground">
                      {value}
                    </span>
                  )}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
