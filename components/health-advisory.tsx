"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ShieldAlert,
  Baby,
  HeartPulse,
  Wind as WindIcon,
  Users,
  XCircle,
  CheckCircle2,
} from "lucide-react"

type RiskCategory = "child" | "elderly" | "asthma" | "general"

const adviceMap: Record<RiskCategory, string> = {
  child:
    "Children should avoid all outdoor activities. Keep indoor air purifiers running. Ensure hydration and limit screen time to reduce stress.",
  elderly:
    "Senior citizens should stay indoors. Avoid morning walks. Keep medication handy. Consult a doctor if breathing issues arise.",
  asthma:
    "High risk of asthma attacks. Keep rescue inhalers accessible. Avoid areas near traffic. Use N95 masks if going outdoors is unavoidable.",
  general:
    "Limit prolonged outdoor exertion. Use public transport over walking. Keep windows closed during peak pollution hours (8-11 AM).",
}

const precautions = [
  { id: "mask", label: "Wear N95 mask outdoors" },
  { id: "exercise", label: "Avoid outdoor exercise" },
  { id: "windows", label: "Keep windows closed" },
  { id: "purifier", label: "Use air purifier indoors" },
  { id: "hydrate", label: "Stay hydrated" },
  { id: "eyes", label: "Protect eyes from irritation" },
]

export function HealthAdvisory() {
  const [category, setCategory] = useState<RiskCategory>("general")
  const shouldGoOut = false // AQI > 150

  const categories: { key: RiskCategory; label: string; icon: React.ReactNode }[] = [
    { key: "child", label: "Child", icon: <Baby className="size-3.5" /> },
    { key: "elderly", label: "Elderly", icon: <HeartPulse className="size-3.5" /> },
    { key: "asthma", label: "Asthma", icon: <WindIcon className="size-3.5" /> },
    { key: "general", label: "General", icon: <Users className="size-3.5" /> },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Should I Go Outside? */}
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <ShieldAlert className="size-4 text-primary" />
            Should I Go Outside Today?
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3 pt-2">
          <div
            className={`flex size-24 items-center justify-center rounded-full ${
              shouldGoOut
                ? "bg-aqi-good/10 text-aqi-good"
                : "bg-aqi-very-poor/10 text-aqi-very-poor"
            }`}
          >
            {shouldGoOut ? (
              <CheckCircle2 className="size-12" />
            ) : (
              <XCircle className="size-12" />
            )}
          </div>
          <span
            className={`text-2xl font-bold ${
              shouldGoOut ? "text-aqi-good" : "text-aqi-very-poor"
            }`}
          >
            {shouldGoOut ? "YES" : "NO"}
          </span>
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            {shouldGoOut
              ? "Air quality is acceptable for outdoor activities."
              : "AQI is above safe thresholds. Prolonged outdoor exposure is not recommended."}
          </p>
          <Badge variant="outline" className="text-[10px]">
            Based on AQI 156 - Poor
          </Badge>
        </CardContent>
      </Card>

      {/* Risk Category Selector */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Risk Category Advice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <Button
                key={c.key}
                variant={category === c.key ? "default" : "outline"}
                size="sm"
                className="h-9 gap-1.5 text-xs"
                onClick={() => setCategory(c.key)}
              >
                {c.icon}
                {c.label}
              </Button>
            ))}
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <p className="text-xs leading-relaxed text-secondary-foreground">
              {adviceMap[category]}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Precautions Checklist */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Precautions Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {precautions.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <Checkbox id={p.id} />
                <label
                  htmlFor={p.id}
                  className="text-xs leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {p.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
