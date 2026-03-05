"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, User, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { getAQIColor, getAQILabel, getAQILevel } from "@/lib/mock-data"

export function DashboardHeader() {
  const [time, setTime] = useState(new Date())
  const [city, setCity] = useState("faridabad")
  const [mode, setMode] = useState<"admin" | "citizen">("admin")

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const cityAQI = 156
  const level = getAQILevel(cityAQI)

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-5" />

      <div className="flex items-center gap-2">
        <MapPin className="size-4 text-muted-foreground" />
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="h-8 w-[140px] border-none bg-secondary text-xs font-medium shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="faridabad">Faridabad</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Badge className={`${getAQIColor(level)} border-0 text-xs`}>
        AQI {cityAQI} - {getAQILabel(level)}
      </Badge>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          <span className="tabular-nums">
            {time.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
          <span className="relative ml-1 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-aqi-good opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-aqi-good" />
          </span>
        </div>

        <Separator orientation="vertical" className="h-5" />

        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-xs"
          onClick={() => setMode(mode === "admin" ? "citizen" : "admin")}
        >
          {mode === "admin" ? (
            <Shield className="size-3.5" />
          ) : (
            <User className="size-3.5" />
          )}
          <span className="hidden sm:inline">
            {mode === "admin" ? "Admin" : "Citizen"}
          </span>
        </Button>

        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          AD
        </div>
      </div>
    </header>
  )
}
