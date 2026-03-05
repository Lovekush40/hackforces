"use client"

import { AQIMap } from "@/components/aqi-map"

export default function MapPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Live AQI Map</h1>
        <p className="text-xs text-muted-foreground">
          Real-time ward-level air quality visualization with interactive exploration
        </p>
      </div>
      <AQIMap />
    </div>
  )
}
