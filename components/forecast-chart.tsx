"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle } from "lucide-react"
import { forecastData } from "@/lib/mock-data"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from "recharts"

export function ForecastChart() {
  const spikeDay = forecastData.find((d) => d.isSpike)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="size-4 text-primary" />
            7-Day Pollution Forecast
          </CardTitle>
          {spikeDay && (
            <Badge className="gap-1 border-0 bg-aqi-very-poor text-white text-[10px]">
              <AlertTriangle className="size-3" />
              Spike Expected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="forecastBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={35}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 11,
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              {/* Confidence band */}
              <Area
                type="monotone"
                dataKey="high"
                stroke="none"
                fill="url(#forecastBand)"
                fillOpacity={1}
              />
              <Area
                type="monotone"
                dataKey="low"
                stroke="none"
                fill="var(--color-card)"
                fillOpacity={1}
              />
              {/* Main line */}
              <Area
                type="monotone"
                dataKey="aqi"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#forecastFill)"
                dot={(props: { cx: number; cy: number; index: number }) => {
                  const d = forecastData[props.index]
                  if (d?.isSpike) {
                    return (
                      <circle
                        key={props.index}
                        cx={props.cx}
                        cy={props.cy}
                        r={5}
                        fill="#ef4444"
                        stroke="white"
                        strokeWidth={2}
                      />
                    )
                  }
                  return (
                    <circle
                      key={props.index}
                      cx={props.cx}
                      cy={props.cy}
                      r={3}
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth={1.5}
                    />
                  )
                }}
              />
              <ReferenceLine
                y={200}
                stroke="#ef4444"
                strokeDasharray="4 4"
                strokeWidth={1}
                label={{
                  value: "Danger",
                  position: "right",
                  fill: "#ef4444",
                  fontSize: 10,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-lg border border-aqi-very-poor/20 bg-aqi-very-poor/5 p-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-aqi-very-poor" />
          <p className="text-xs leading-relaxed text-foreground">
            <span className="font-semibold">Alert:</span> High pollution
            expected on Thursday due to low wind speed and temperature inversion.
            Consider preemptive admin actions.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
