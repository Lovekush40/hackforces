"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Map,
  Heart,
  TrendingUp,
  ShieldAlert,
  FileText,
  Settings,
  Wind,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Live AQI Map", icon: Map, href: "/map" },
  { title: "Health Advisory", icon: Heart, href: "/health" },
  { title: "Forecast", icon: TrendingUp, href: "/forecast" },
  { title: "Admin Actions", icon: ShieldAlert, href: "/admin" },
  { title: "Reports", icon: FileText, href: "/reports" },
  { title: "Settings", icon: Settings, href: "/settings" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Wind className="size-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
              VayuNetra
            </span>
            <span className="text-[10px] leading-none text-sidebar-foreground/60">
              Air Intelligence Platform
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <div className="rounded-lg bg-sidebar-accent/50 p-3">
          <p className="text-[11px] leading-relaxed text-sidebar-foreground/60">
            Powered by ML & IoT Sensors
          </p>
          <p className="mt-0.5 text-[10px] text-sidebar-foreground/40">
            v2.1.0 - CPCB Integrated
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
