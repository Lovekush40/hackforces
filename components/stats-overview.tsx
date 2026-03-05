"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wind, Thermometer, Droplets, Eye } from "lucide-react"

const stats = [
  {
    label: "City AQI",
    value: "156",
    change: "+12%",
    trend: "up" as const,
    icon: Wind,
    color: "text-aqi-poor",
    bg: "bg-aqi-poor/10",
  },
  {
    label: "Temperature",
    value: "34°C",
    change: "+2°C",
    trend: "up" as const,
    icon: Thermometer,
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    label: "Humidity",
    value: "45%",
    change: "-5%",
    trend: "down" as const,
    icon: Droplets,
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    label: "Visibility",
    value: "3.2 km",
    change: "-0.8 km",
    trend: "down" as const,
    icon: Eye,
    color: "text-chart-1",
    bg: "bg-chart-1/10",
  },
]

export function StatsOverview() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
            >
              <stat.icon className={`size-5 ${stat.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-muted-foreground">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <p className="text-lg font-bold text-foreground">
                  {stat.value}
                </p>
                <span
                  className={`text-[10px] font-medium ${
                    stat.trend === "up"
                      ? "text-aqi-very-poor"
                      : "text-aqi-good"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
