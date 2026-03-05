"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MapPin, Brain, TrendingUp } from "lucide-react"
import {
  wards,
  hourlyTrend,
  mlInsights,
  getAQIColor,
  getAQILabel,
  getAQIColorHex,
  type Ward,
} from "@/lib/mock-data"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

function WardDetailModal({
  ward,
  open,
  onClose,
}: {
  ward: Ward | null
  open: boolean
  onClose: () => void
}) {
  if (!ward) return null
  const insight = mlInsights[ward.id]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="size-5 text-primary" />
            {ward.name}
            <Badge variant="outline" className="ml-1 text-xs font-normal">
              {ward.code}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex size-20 flex-col items-center justify-center rounded-xl ${getAQIColor(ward.level)}`}
            >
              <span className="text-2xl font-bold">{ward.aqi}</span>
              <span className="text-[10px] font-medium uppercase">AQI</span>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2">
              {[
                { label: "PM2.5", value: ward.pm25, unit: "ug/m3" },
                { label: "PM10", value: ward.pm10, unit: "ug/m3" },
                { label: "NO2", value: ward.no2, unit: "ppb" },
                { label: "SO2", value: ward.so2, unit: "ppb" },
                { label: "O3", value: ward.o3, unit: "ppb" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="rounded-lg bg-secondary p-2 text-center"
                >
                  <p className="text-[10px] font-medium text-muted-foreground">
                    {p.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {p.value}
                  </p>
                  <p className="text-[9px] text-muted-foreground">{p.unit}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Last 24 Hours Trend
            </p>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyTrend}>
                  <defs>
                    <linearGradient
                      id="trendGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={getAQIColorHex(ward.level)}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={getAQIColorHex(ward.level)}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 9 }}
                    tickLine={false}
                    axisLine={false}
                    interval={5}
                  />
                  <YAxis
                    tick={{ fontSize: 9 }}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      fontSize: 11,
                      borderRadius: 8,
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="aqi"
                    stroke={getAQIColorHex(ward.level)}
                    strokeWidth={2}
                    fill="url(#trendGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {insight && (
            <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <Brain className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  ML Insight
                </p>
                <p className="text-xs text-muted-foreground">
                  Likely pollution source:{" "}
                  <span className="font-medium text-foreground">
                    {insight.source}
                  </span>{" "}
                  ({insight.confidence}% confidence)
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function AQIMap() {
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null)
  const [hoveredWard, setHoveredWard] = useState<string | null>(null)

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="size-4 text-primary" />
            Live Ward-Level AQI Map
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative aspect-[16/9] min-h-[350px] bg-secondary/50">
            {/* Map placeholder with ward dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 600 400"
                className="size-full"
                aria-label="Ward AQI Map"
              >
                {/* City boundary */}
                <path
                  d="M100,80 Q150,50 250,60 Q350,50 450,80 Q520,120 530,200 Q520,300 450,340 Q350,370 250,360 Q150,370 100,340 Q60,300 50,200 Q60,120 100,80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 3"
                  className="text-border"
                />
                {/* Ward grid lines */}
                <path
                  d="M200,60 L200,360"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  className="text-border"
                />
                <path
                  d="M350,60 L350,360"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  className="text-border"
                />
                <path
                  d="M50,200 L530,200"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  className="text-border"
                />
                {/* Ward dots */}
                {wards.map((ward, i) => {
                  const positions = [
                    { x: 150, y: 120 },
                    { x: 280, y: 140 },
                    { x: 420, y: 280 },
                    { x: 180, y: 250 },
                    { x: 350, y: 190 },
                    { x: 450, y: 130 },
                    { x: 300, y: 310 },
                    { x: 130, y: 180 },
                  ]
                  const pos = positions[i]
                  const isHovered = hoveredWard === ward.id
                  return (
                    <g
                      key={ward.id}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredWard(ward.id)}
                      onMouseLeave={() => setHoveredWard(null)}
                      onClick={() => setSelectedWard(ward)}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHovered ? 22 : 18}
                        fill={getAQIColorHex(ward.level)}
                        opacity={isHovered ? 0.3 : 0.15}
                        className="transition-all duration-200"
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHovered ? 14 : 12}
                        fill={getAQIColorHex(ward.level)}
                        opacity={0.9}
                        className="transition-all duration-200"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 1}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontSize={isHovered ? "10" : "9"}
                        fontWeight="700"
                      >
                        {ward.aqi}
                      </text>
                      {isHovered && (
                        <text
                          x={pos.x}
                          y={pos.y - 22}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="currentColor"
                          fontSize="10"
                          fontWeight="600"
                          className="text-foreground"
                        >
                          {ward.name}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex gap-1.5 rounded-lg bg-card/90 p-2 shadow-sm backdrop-blur-sm">
              {(
                [
                  { label: "Good", color: "#4ade80" },
                  { label: "Moderate", color: "#facc15" },
                  { label: "Poor", color: "#fb923c" },
                  { label: "Very Poor", color: "#ef4444" },
                  { label: "Severe", color: "#7f1d1d" },
                ] as const
              ).map((item) => (
                <div key={item.label} className="flex items-center gap-1">
                  <div
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[9px] font-medium text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ward Summary Panel */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="size-4 text-primary" />
            Ward Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[380px]">
            <div className="space-y-1 px-4 pb-4">
              {wards
                .sort((a, b) => b.aqi - a.aqi)
                .map((ward) => (
                  <button
                    key={ward.id}
                    onClick={() => setSelectedWard(ward)}
                    className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-secondary"
                  >
                    <div
                      className={`flex size-10 flex-col items-center justify-center rounded-lg ${getAQIColor(ward.level)}`}
                    >
                      <span className="text-xs font-bold">{ward.aqi}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {ward.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {ward.code}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-[10px]"
                    >
                      {getAQILabel(ward.level)}
                    </Badge>
                  </button>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <WardDetailModal
        ward={selectedWard}
        open={!!selectedWard}
        onClose={() => setSelectedWard(null)}
      />
    </div>
  )
}
