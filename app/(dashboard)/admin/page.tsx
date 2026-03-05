"use client"

import { AdminActions } from "@/components/admin-actions"

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          Admin Actions
        </h1>
        <p className="text-xs text-muted-foreground">
          ML-generated recommendations for municipal officers to mitigate air pollution
        </p>
      </div>
      <AdminActions />
    </div>
  )
}
