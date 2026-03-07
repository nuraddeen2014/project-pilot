import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const project = await request.json();

    const prompt = `You are a senior university supervisor.

Given the project below, create a structured project execution plan.

Project:
${JSON.stringify(project, null, 2)}

Return JSON ONLY with:
project_phases (array of objects with name, description, duration_weeks)
milestones (array of strings)
timeline (array of strings)
documentation_structure (array of strings)

Example format:

{
  "project_phases": [
    {
      "name": "Phase 1: Research",
      "description": "Literature review and setup",
      "duration_weeks": 2
    }
  ],
  "milestones": ["Completed architecture diagram", "MVP ready"],
  "timeline": ["Week 1: Gather requirements", "Week 2: Setup database"],
  "documentation_structure": ["1. Introduction", "2. Methodology"]
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const resultText = completion.choices[0]?.message?.content || "{}";
    const resultJson = JSON.parse(resultText);

    return NextResponse.json(resultJson);

  } catch (error) {
    console.error("AI Roadmap Error", error);
    return NextResponse.json({ error: "Failed to generate project roadmap" }, { status: 500 });
  }
}
