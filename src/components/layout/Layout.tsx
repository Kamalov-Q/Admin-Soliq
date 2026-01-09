import { Outlet, Link, useLocation } from 'react-router-dom'
import { Newspaper, Video, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Layout() {
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigation = [
        { name: 'Blogs', href: '/blogs', icon: Video },
        { name: 'News', href: '/news', icon: Newspaper },
    ]

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="shrink-0 flex items-center">
                                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                                    <Newspaper className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <h1 className="ml-3 text-xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                    Admin Dashboard
                                </h1>
                            </div>
                            <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
                                {navigation.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={cn(
                                                "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                                location.pathname === item.href
                                                    ? "bg-primary text-primary-foreground shadow-md"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            )}
                                        >
                                            <Icon className="w-4 h-4 mr-2" />
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="sm:hidden flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="sm:hidden border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center px-3 py-2 rounded-md text-base font-medium",
                                            location.pathname === item.href
                                                ? "bg-primary text-primary-foreground"
                                                : "text-slate-600 hover:bg-slate-100"
                                        )}
                                    >
                                        <Icon className="w-5 h-5 mr-3" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </nav>
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    )
}