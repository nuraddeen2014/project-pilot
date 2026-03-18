"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { FileText, Target, CalendarDays, ArrowLeft, CheckCircle2 } from "lucide-react"

type RoadmapData = {
  roadmap: {
    week_number: number
    phase: string
    tasks: string[]
    risks_or_challenges: string
    expected_output: string
  }[]
}

export default function RoadmapPage() {
  const router = useRouter()
  const [projectTitle, setProjectTitle] = useState("")
  const [data, setData] = useState<RoadmapData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("projectRoadmap")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setProjectTitle(parsed.project.title)
        setData(parsed.roadmap)
      } catch (e) {
        console.error(e)
      }
    } else {
      router.push("/profile")
    }
  }, [router])

  if (!data) return <div className="min-h-screen flex items-center justify-center p-6">Loading execution plan...</div>

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <Button variant="ghost" className="mb-8" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Ideas
        </Button>

        <div className="mb-12">
          <Badge variant="glass" className="mb-4">Project Roadmap</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{projectTitle}</h1>
          <p className="text-zinc-400 text-lg">Your customized execution plan developed by AI to ensure timely and successful completion.</p>
        </div>

        <div className="space-y-6">
          {data.roadmap?.map((week, i) => (
            <Card key={i} className="relative overflow-hidden border-white/10 hover:border-primary/50 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent"></div>
              <CardHeader className="pl-6 pb-2">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10">
                    Week {week.week_number}
                  </Badge>
                  <Badge variant="glass" className="text-zinc-300">
                    {week.phase}
                  </Badge>
                </div>
                <CardTitle className="text-xl">Weekly Objectives</CardTitle>
              </CardHeader>
              <CardContent className="pl-6">
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="flex items-center text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                      <Target className="w-4 h-4 mr-2" /> Tasks
                    </h4>
                    <ul className="space-y-2">
                      {week.tasks?.map((task, j) => (
                        <li key={j} className="flex items-start text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="flex items-center text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                         Risks & Challenges
                      </h4>
                      <p className="text-sm text-amber-200/80 bg-amber-500/10 p-3 rounded-md border border-amber-500/20">
                        {week.risks_or_challenges}
                      </p>
                    </div>
                    <div>
                      <h4 className="flex items-center text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        <FileText className="w-4 h-4 mr-2" /> Expected Output
                      </h4>
                      <p className="text-sm text-blue-200/80 bg-blue-500/10 p-3 rounded-md border border-blue-500/20">
                        {week.expected_output}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
