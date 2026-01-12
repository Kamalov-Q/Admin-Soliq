import { Link, useLocation } from 'react-router-dom'
import { Video, Newspaper, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Sidebar() {
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const navigation = [
        { name: 'Blogs', href: '/blogs', icon: Video },
        { name: 'News', href: '/news', icon: Newspaper },
    ]

    return (
        <>
            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Overlay for mobile */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen w-64 transform bg-white border-r transition-transform duration-200 ease-in-out",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center gap-3 border-b px-6">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                            <Newspaper className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-xl font-bold">Admin Panel</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            const isActive = location.pathname === item.href

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-gray-700 hover:bg-gray-100"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="border-t p-4">
                        <p className="text-xs text-gray-500 text-center">
                            © 2026 Blog & News Admin
                        </p>
                    </div>
                </div>
            </aside>
        </>
    )
}