"use client"

import { StatsOverview } from "@/components/stats-overview"
import { AQIMap } from "@/components/aqi-map"
import { ComparisonCharts } from "@/components/comparison-charts"
import { HealthAdvisory } from "@/components/health-advisory"
import { ForecastChart } from "@/components/forecast-chart"
import { AdminActions } from "@/components/admin-actions"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <StatsOverview />

      {/* Section 1: Live AQI Map */}
      <section>
        <AQIMap />
      </section>

      {/* Section 2: City & Ward Comparison */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">
            City & Ward Comparison
          </h2>
          <Separator className="flex-1" />
        </div>
        <ComparisonCharts />
      </section>

      {/* Section 3: Health Advisory */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">
            Citizen Health Advisory
          </h2>
          <Separator className="flex-1" />
        </div>
        <HealthAdvisory />
      </section>

      {/* Section 4: Forecast */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">
            7-Day Pollution Forecast
          </h2>
          <Separator className="flex-1" />
        </div>
        <ForecastChart />
      </section>

      {/* Section 5: Admin Actions */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">
            Administrator Action Engine
          </h2>
          <Separator className="flex-1" />
        </div>
        <AdminActions />
      </section>
    </div>
  )
}
