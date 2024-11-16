"use client"
import { Button } from "@/components/ui/button"
import ProtectedRoute from "@/components/auth/protected-route-wrapper"
import useCurrentUser from "@/hooks/useCurrentUser"
import logout from "@/actions/logout"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggleButton } from "@/components/theme-toggle"
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
        const path = usePathname()
        // split path by / and convert each to titlecase and remove first empty string
        const breadcrumbs = path.split('/').map((path) => path.charAt(0).toUpperCase() + path.slice(1)).slice(1)
        const { user, loading } = useCurrentUser()
        return (
                <>
                        <ProtectedRoute user={user} loading={loading}>

                                <SidebarProvider>
                                        <AppSidebar />
                                        <main className="w-full">
                                                <div className="pl-5 pr-[2%] flex flex-row justify-between items-center w-full gap-3 py-3 border border-0 border-b-[1px]">
                                                        <div className="flex gap-3 items-center">
                                                                <SidebarTrigger />
                                                                <Separator orientation="vertical" className="h-[20px]" />
                                                                <Breadcrumb>
                                                                        <BreadcrumbList>
                                                                                {breadcrumbs.map((breadcrumb, index) => {
                                                                                        return (
                                                                                                <>
                                                                                                        <BreadcrumbItem>{breadcrumb}</BreadcrumbItem>
                                                                                                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                                                                                </>

                                                                                        )
                                                                                })}
                                                                        </BreadcrumbList>
                                                                </Breadcrumb>
                                                        </div>
                                                        <ThemeToggleButton />
                                                </div>

                                                <div className="w-full">
                                                        {children}
                                                </div>
                                        </main>
                                </SidebarProvider>
                        </ProtectedRoute>
                </>
        )
}

