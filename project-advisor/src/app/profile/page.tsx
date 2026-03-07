"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Sparkles, Loader2 } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    course: "",
    skills: "",
    interests: "",
    goals: "",
    resources: "",
    projectType: "Application"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch("/.netlify/functions/generateIdeas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error("Failed to generate ideas")
      }
      
      const data = await response.json()
      sessionStorage.setItem("projectIdeas", JSON.stringify(data))
      router.push("/ideas")
    } catch (error) {
      console.error(error)
      alert("Something went wrong generating ideas. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8 items-center text-center">
          <h1 className="text-3xl font-bold mb-2">Student Profile</h1>
          <p className="text-zinc-400">Tell us about your background so we can generate perfectly tailored project ideas.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Academic & Personal Details</CardTitle>
            <CardDescription>All fields help the AI understand your context better.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Course / Major</label>
                <Input 
                  placeholder="e.g. B.S. Computer Science" 
                  required 
                  value={formData.course}
                  onChange={e => setFormData({...formData, course: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Technical Skills (comma separated)</label>
                <Input 
                  placeholder="e.g. React, Python, PostgreSQL, AWS" 
                  required 
                  value={formData.skills}
                  onChange={e => setFormData({...formData, skills: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Personal Interests</label>
                <Input 
                  placeholder="e.g. Space exploration, Finance, Healthcare, Gaming" 
                  required 
                  value={formData.interests}
                  onChange={e => setFormData({...formData, interests: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Career Goals</label>
                <Input 
                  placeholder="e.g. Full-Stack Developer, Data Scientist, Founder" 
                  value={formData.goals}
                  onChange={e => setFormData({...formData, goals: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Available Resources (Optional)</label>
                <Input 
                  placeholder="e.g. Raspberry Pi, specific datasets, VR Headset" 
                  value={formData.resources}
                  onChange={e => setFormData({...formData, resources: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Preferred Project Type</label>
                <select 
                  className="w-full h-12 rounded-md border border-white/10 bg-zinc-950/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  value={formData.projectType}
                  onChange={e => setFormData({...formData, projectType: e.target.value})}
                >
                  <option value="Research">Research</option>
                  <option value="Application">Application</option>
                  <option value="AI / ML">AI / ML</option>
                  <option value="Systems">Systems</option>
                </select>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Project Ideas
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
