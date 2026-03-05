"use client"

import { HealthAdvisory } from "@/components/health-advisory"

export default function HealthPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          Health Advisory
        </h1>
        <p className="text-xs text-muted-foreground">
          Personalized health guidance based on current air quality conditions
        </p>
      </div>
      <HealthAdvisory />
    </div>
  )
}
