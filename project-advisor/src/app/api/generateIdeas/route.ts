import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const profile = await request.json();

    const prompt = `You are an experienced academic advisor helping university students choose their final year project.

Using the student profile below, generate project ideas that match their interests, skills, and career goals.

Student profile:
${JSON.stringify(profile, null, 2)}

Generate exactly 9 ideas categorized into:

Innovative Projects
Advanced Projects
High-Scoring Standard Projects

Each project must include:

title
description
technologies (array of strings)
complexity_level
estimated_effort_hours
expected_outcomes

Return JSON ONLY in exactly this format, with no markdown formatting or extra text:

{
  "innovative": [],
  "advanced": [],
  "standard": []
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
    console.error("AI Generation Error", error);
    return NextResponse.json({ error: "Failed to generate project ideas" }, { status: 500 });
  }
}
