"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Calendar, Info, Phone } from "lucide-react"
import { useSession } from "next-auth/react"

const routes = [
  {
    href: "/",
    label: "Home",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    href: "/events",
    label: "Events",
    icon: <Calendar className="mr-2 h-4 w-4" />,
  },
  {
    href: "/about",
    label: "About Us",
    icon: <Info className="mr-2 h-4 w-4" />,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: <Phone className="mr-2 h-4 w-4" />,
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const { data: session } = useSession()

  return (
    <div className="flex gap-6 md:gap-10">
      <div className="hidden md:flex gap-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === route.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" aria-label="Toggle Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    pathname === route.href ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t">
                {session ? (
                  <Link
                    href="/profile"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

