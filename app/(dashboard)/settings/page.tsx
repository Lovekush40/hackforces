"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Bell,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Shield,
  Database,
  RefreshCw,
} from "lucide-react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    aqiAlerts: true,
    healthAdvisory: true,
    adminActions: false,
    dailyDigest: true,
  })

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground">
          Configure your VayuDrishti dashboard preferences
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Notification Preferences */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bell className="size-4 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: "aqiAlerts" as const,
                label: "AQI Threshold Alerts",
                desc: "Get notified when AQI exceeds safe limits",
              },
              {
                key: "healthAdvisory" as const,
                label: "Health Advisory Updates",
                desc: "Receive health guidance notifications",
              },
              {
                key: "adminActions" as const,
                label: "Admin Action Alerts",
                desc: "Notifications for new action recommendations",
              },
              {
                key: "dailyDigest" as const,
                label: "Daily Digest",
                desc: "Morning summary of air quality",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={() => toggleNotification(item.key)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              {darkMode ? (
                <Moon className="size-4 text-primary" />
              ) : (
                <Sun className="size-4 text-primary" />
              )}
              Display Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-foreground">
                  Dark Mode
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Toggle dark theme for the dashboard
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium text-foreground">Language</p>
                <p className="text-[10px] text-muted-foreground">
                  Select your preferred language
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="size-3.5 text-muted-foreground" />
                <Select defaultValue="en">
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium text-foreground">
                  Install as App
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Add VayuDrishti to your home screen
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Smartphone className="size-3.5" />
                Install PWA
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="size-4 text-primary" />
              Data & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">Data Source</span>
              <Badge variant="secondary" className="text-[10px]">
                CPCB + Municipal IoT
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">
                Last Data Sync
              </span>
              <span className="text-[11px] text-muted-foreground">
                2 minutes ago
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">API Status</span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-aqi-good opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-aqi-good" />
                </span>
                <span className="text-[11px] text-aqi-good">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">Sensor Network</span>
              <span className="text-[11px] text-muted-foreground">
                24/24 Active
              </span>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Database className="size-4 text-primary" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">Platform Version</span>
              <span className="text-[11px] font-mono text-muted-foreground">
                v2.1.0
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">ML Model</span>
              <span className="text-[11px] font-mono text-muted-foreground">
                AQI-Forecast v3.2
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">
                Prediction Accuracy
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                91.4%
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 text-xs"
            >
              <RefreshCw className="size-3.5" />
              Check for Updates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
