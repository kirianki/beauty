"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Sparkles, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()

  if (!isMobile) return null

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gradient-to-b from-rose-50 to-white p-0">
        <div className="flex flex-col h-full">
          <div className="border-b p-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-display font-bold text-xl text-primary flex items-center"
              onClick={() => setOpen(false)}
            >
              <Sparkles className="h-5 w-5 mr-1 text-primary" />
              GlowGirl
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="space-y-2 px-2">
              <NavItem href="/" onClick={() => setOpen(false)}>
                Home
              </NavItem>
              <NavItem href="/new-arrivals" onClick={() => setOpen(false)}>
                New Arrivals
              </NavItem>
              <NavItem href="/categories/skincare" onClick={() => setOpen(false)}>
                Skincare
              </NavItem>
              <NavItem href="/categories/makeup" onClick={() => setOpen(false)}>
                Makeup
              </NavItem>
              <NavItem href="/categories/hair" onClick={() => setOpen(false)}>
                Hair
              </NavItem>
              <NavItem href="/gifts" onClick={() => setOpen(false)}>
                Gifts
              </NavItem>
              <NavItem href="/products" onClick={() => setOpen(false)}>
                All Products
              </NavItem>
            </ul>
          </nav>
          <div className="border-t p-4">
            <Button className="w-full bg-primary hover:bg-primary/90 rounded-full" onClick={() => setOpen(false)}>
              Contact Us
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function NavItem({ href, children, onClick }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors"
        onClick={onClick}
      >
        <span className="font-medium">{children}</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </li>
  )
}
