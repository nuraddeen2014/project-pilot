"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"

export function Navbar() {
  const pathname = usePathname()

  // Don't render the navbar on the actual project generation/roadmap pages
  // if you want them to be immersive, though usually standard practice is to keep it.
  // We'll keep it globally for easy navigation.

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ProjectPilot
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-white ${pathname === "/" ? "text-white" : "text-zinc-400"}`}
            >
              Home
            </Link>
            <Link 
              href="/profile" 
              className={`text-sm font-medium transition-colors hover:text-white ${pathname === "/profile" ? "text-white" : "text-zinc-400"}`}
            >
              Start Project
            </Link>
            <Link 
              href="/ideas" 
              className={`text-sm font-medium transition-colors hover:text-white ${pathname === "/ideas" ? "text-white" : "text-zinc-400"}`}
            >
              My Ideas
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button variant={pathname === "/" ? "ghost" : "default"} className="text-sm">
              {pathname === "/" ? "Get Started" : "New Search"}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
