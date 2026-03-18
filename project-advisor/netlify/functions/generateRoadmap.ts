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
    const prompt = `Create a clear, student-friendly weekly roadmap for the following final-year project:

Project Title: ${project.title}
Project Description: ${project.description}
Student Course: ${project.course || "Not specified"}

Instructions:

1. Break the project into weekly steps (6-12 weeks depending on complexity)

2. For each week include:
   - week_number
   - phase (e.g., Research, Planning, Execution, Writing, Review)
   - tasks (specific and actionable)
   - risks_or_challenges
   - expected_output

3. Adapt the roadmap to the nature of the field:
   - Technical fields -> include development, testing
   - Non-technical fields -> include research, analysis, writing, fieldwork, creative production

4. Keep the roadmap:
   - Practical and realistic
   - Easy to follow
   - Academically relevant

5. Avoid overly technical or corporate language - this is for a student, not a company.

Return ONLY valid JSON in this exact format:

{
  "roadmap": [
    {
      "week_number": 1,
      "phase": "string",
      "tasks": ["string", "string"],
      "risks_or_challenges": "string",
      "expected_output": "string"
    }
  ]
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
