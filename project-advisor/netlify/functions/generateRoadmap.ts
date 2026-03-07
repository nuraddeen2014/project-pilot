import { Handler } from "@netlify/functions";
import Groq from "groq-sdk";

// Initialize the Groq client
// Reads the GROQ_API_KEY securely from environment variables
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const handler: Handler = async (event) => {
  // Ensure we only handle POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the selected project data from the request body
    const project = JSON.parse(event.body || "{}");

    // Construct the prompt to act as an execution planner
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

    // Call Groq AI to generate the roadmap
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile", // Using the required LLaMA 3 model
      temperature: 0.7,
      response_format: { type: "json_object" } // Guarantee structured JSON
    });

    const resultText = completion.choices[0]?.message?.content || "{}";
    const resultJson = JSON.parse(resultText);

    // Return the successful structured JSON payload
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultJson),
    };

  } catch (error) {
    console.error("AI Roadmap Error:", error);
    // Graceful error handling
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate project roadmap" }),
    };
  }
};
