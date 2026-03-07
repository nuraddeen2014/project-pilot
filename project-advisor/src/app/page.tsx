import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ArrowRight, Sparkles, Target, Compass } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
      
      {/* Navbar placeholder */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ProjectPilot
          </div>
          <nav>
            <Link href="/profile">
              <Button variant="ghost" className="text-sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 container mx-auto z-10 text-center">
        {/* Hero Section */}
        <Badge className="mb-6" variant="glass">
          <Sparkles className="w-3 h-3 mr-2 text-accent" />
          AI-Powered Discovery
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Discover the Perfect <br className="hidden md:block"/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Final Year Project</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12">
          AI-powered project ideation and planning for university students. 
          Stop struggling with blank pages and let our AI guide you to a meaningful, feasible, and innovative project.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/profile">
            <Button size="lg" className="w-full sm:w-auto group">
              Generate Project Ideas
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            View Example Projects
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-32 w-full max-w-5xl text-left">
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Project Generator</h3>
              <p className="text-zinc-400">
                Tailored project suggestions based on your specific major, skills, and personal interests.
              </p>
            </div>
          </Card>

          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Feasibility Analysis</h3>
              <p className="text-zinc-400">
                Understand the complexity, required technologies, and estimated effort BEFORE you commit.
              </p>
            </div>
          </Card>

          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Roadmaps</h3>
              <p className="text-zinc-400">
                Get a structured, week-by-week execution plan with milestones to ensure you finish on time.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

function Badge({ className, variant, children }: any) {
  // Temporary local badge mapping just to avoid circular dependency in case I misconfigured the component imports
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className} border-white/10 bg-white/5 text-white backdrop-blur-sm`}>
      {children}
    </div>
  )
}
