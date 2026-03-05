"use client"

import { ForecastChart } from "@/components/forecast-chart"

export default function ForecastPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          Pollution Forecast
        </h1>
        <p className="text-xs text-muted-foreground">
          ML-powered 7-day AQI prediction with confidence intervals
        </p>
      </div>
      <ForecastChart />
    </div>
  )
}
