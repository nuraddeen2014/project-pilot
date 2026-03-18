"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Clock, Layers, Sparkles, Loader2 } from "lucide-react"

type ProjectIdea = {
  title: string
  description: string
  why_this_fits: string
  approach_or_methods: string | string[]
  complexity: string
  estimated_time: string | number
  expected_outcome: string
}

type IdeasData = {
  innovative: ProjectIdea[]
  advanced: ProjectIdea[]
  standard: ProjectIdea[]
}

export default function IdeasPage() {
  const router = useRouter()
  const [data, setData] = useState<IdeasData | null>(null)
  const [loadingProject, setLoadingProject] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("projectIdeas")
    if (stored) {
      try {
        setData(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse ideas")
      }
    } else {
      router.push("/profile")
    }
  }, [router])

  const generateRoadmap = async (project: ProjectIdea) => {
    setLoadingProject(project.title)
    try {
      const course = sessionStorage.getItem("studentCourse") || "Not specified"
      const payload = { ...project, course }
      const response = await fetch("/.netlify/functions/generateRoadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      if (!response.ok) throw new Error("Failed to generate roadmap")
      
      const roadmapData = await response.json()
      sessionStorage.setItem("projectRoadmap", JSON.stringify({ project, roadmap: roadmapData }))
      router.push("/roadmap")
    } catch (error) {
      console.error(error)
      alert("Failed to generate roadmap.")
    } finally {
      setLoadingProject(null)
    }
  }

  if (!data) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>

  const ProjectCard = ({ project, category }: { project: ProjectIdea, category: "innovative" | "advanced" | "standard" }) => (
    <Card className="flex flex-col h-full hover:border-primary/50 hover:shadow-primary/10 transition-all">
      <CardHeader>
        <div className="flex justify-between items-start gap-4 mb-2">
          <Badge variant={category === "innovative" ? "default" : category === "advanced" ? "secondary" : "outline"}>
            {category === "innovative" && <Sparkles className="w-3 h-3 mr-1" />}
            {project.complexity}
          </Badge>
          <div className="flex items-center text-xs text-zinc-400">
            <Clock className="w-3 h-3 mr-1" />
            {project.estimated_time} weeks
          </div>
        </div>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription className="text-sm mt-2 line-clamp-3">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Why This Fits</h4>
            <p className="text-sm text-zinc-300 italic">"{project.why_this_fits}"</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 flex items-center"><Layers className="w-3 h-3 mr-1"/> Approach / Methods</h4>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.approach_or_methods) 
                ? project.approach_or_methods.map((method, i) => <Badge key={i} variant="glass" className="text-[10px]">{method}</Badge>)
                : <p className="text-sm text-zinc-300">{project.approach_or_methods}</p>
              }
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Expected Outcome</h4>
            <p className="text-sm text-zinc-300">{project.expected_outcome}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => generateRoadmap(project)}
          disabled={loadingProject !== null}
        >
          {loadingProject === project.title ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Generating Roadmap...</>
          ) : (
            "Select & Generate Roadmap"
          )}
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            Generated Project Ideas
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">We've analyzed your profile and generated 9 tailored project concepts. Review the options below and select the one that excites you the most to generate a complete execution roadmap.</p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-primary">
              <Sparkles className="w-6 h-6 mr-2" /> Innovative Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.innovative?.map(p => <ProjectCard key={p.title} project={p} category="innovative" />)}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-secondary">
              <Layers className="w-6 h-6 mr-2" /> Advanced Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.advanced?.map(p => <ProjectCard key={p.title} project={p} category="advanced" />)}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-zinc-300">
              High-Scoring Standard Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.standard?.map(p => <ProjectCard key={p.title} project={p} category="standard" />)}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
