"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { FileText, Target, CalendarDays, ArrowLeft, CheckCircle2 } from "lucide-react"

type RoadmapData = {
  project_phases: { name: string, description: string, duration_weeks: number }[]
  milestones: string[]
  timeline: string[]
  documentation_structure: string[]
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

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <CalendarDays className="w-5 h-5 mr-2" /> Project Phases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative border-l border-white/10 ml-3 space-y-8">
                  {data.project_phases?.map((phase, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute w-4 h-4 bg-primary rounded-full -left-[8.5px] top-1 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                      <h3 className="text-xl font-semibold mb-1">{phase.name}</h3>
                      <Badge variant="outline" className="mb-3 text-[10px]">{phase.duration_weeks} Weeks</Badge>
                      <p className="text-zinc-400">{phase.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-secondary">
                  <Target className="w-5 h-5 mr-2" /> Weekly Timeline
                </CardTitle>
                <CardDescription>A granular breakdown of your activities.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {data.timeline?.map((item, i) => (
                    <li key={i} className="flex items-start bg-white/5 p-4 rounded-lg border border-white/5">
                      <CheckCircle2 className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-zinc-900 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center text-accent">
                  <Target className="w-5 h-5 mr-2" /> Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.milestones?.map((milestone, i) => (
                    <li key={i} className="flex items-center text-sm text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></div>
                      {milestone}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-zinc-100">
                  <FileText className="w-5 h-5 mr-2" /> Documentation
                </CardTitle>
                <CardDescription>Required report structure</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {data.documentation_structure?.map((doc, i) => (
                    <li key={i} className="text-sm font-medium text-zinc-400 p-2 bg-black/20 rounded">
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
