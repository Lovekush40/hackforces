"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ShieldAlert,
  Droplets,
  Truck,
  Building,
  TreePine,
  Check,
  X,
  FileDown,
  Share2,
  Mail,
} from "lucide-react"
import { recommendations, getAQILabel } from "@/lib/mock-data"
import type { Recommendation } from "@/lib/mock-data"

const iconMap: Record<string, React.ReactNode> = {
  droplets: <Droplets className="size-5 text-primary" />,
  truck: <Truck className="size-5 text-aqi-poor" />,
  building: <Building className="size-5 text-aqi-very-poor" />,
  trees: <TreePine className="size-5 text-aqi-good" />,
}

const severityColors: Record<string, string> = {
  good: "bg-aqi-good/10 text-aqi-good border-aqi-good/20",
  moderate: "bg-aqi-moderate/10 text-aqi-moderate border-aqi-moderate/20",
  poor: "bg-aqi-poor/10 text-aqi-poor border-aqi-poor/20",
  "very-poor": "bg-aqi-very-poor/10 text-aqi-very-poor border-aqi-very-poor/20",
  severe: "bg-aqi-severe/10 text-aqi-severe border-aqi-severe/20",
}

function RecommendationCard({
  rec,
  onApprove,
  onReject,
}: {
  rec: Recommendation
  onApprove: () => void
  onReject: () => void
}) {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">(
    "pending"
  )

  return (
    <Card className={status !== "pending" ? "opacity-60" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
            {iconMap[rec.icon] || <ShieldAlert className="size-5 text-primary" />}
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground">
                {rec.title}
              </h4>
              <Badge
                variant="outline"
                className={`shrink-0 text-[10px] ${severityColors[rec.severity]}`}
              >
                {getAQILabel(rec.severity)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{rec.reason}</p>
            <div className="flex flex-wrap gap-1">
              {rec.wards.map((w) => (
                <Badge key={w} variant="secondary" className="text-[10px]">
                  {w}
                </Badge>
              ))}
            </div>
            {status === "pending" ? (
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  className="h-7 gap-1 text-xs"
                  onClick={() => {
                    setStatus("approved")
                    onApprove()
                  }}
                >
                  <Check className="size-3" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-xs"
                  onClick={() => {
                    setStatus("rejected")
                    onReject()
                  }}
                >
                  <X className="size-3" />
                  Reject
                </Button>
              </div>
            ) : (
              <Badge
                variant={status === "approved" ? "default" : "destructive"}
                className="text-[10px]"
              >
                {status === "approved" ? "Approved" : "Rejected"}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminActions() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Auto-Generated Recommendations
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              rec={rec}
              onApprove={() => {}}
              onReject={() => {}}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Action Controls
        </h3>
        <Card>
          <CardContent className="space-y-3 p-4">
            <Button className="w-full gap-2 text-xs" size="sm">
              <FileDown className="size-3.5" />
              Export Report (PDF)
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1.5 text-xs"
              >
                <Share2 className="size-3.5" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1.5 text-xs"
              >
                <Mail className="size-3.5" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="mb-2 text-xs font-semibold text-foreground">
              Quick Stats
            </h4>
            <div className="space-y-2">
              {[
                { label: "Total Actions Generated", value: "4" },
                { label: "Approved This Week", value: "12" },
                { label: "Avg Response Time", value: "2.4 hrs" },
                { label: "Compliance Rate", value: "87%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-[11px] text-muted-foreground">
                    {stat.label}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
