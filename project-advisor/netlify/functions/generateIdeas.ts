import { Handler } from "@netlify/functions";
import Groq from "groq-sdk";

// Initialize the Groq client
// It automatically picks up GROQ_API_KEY from the environment variables (e.g. .env.local or Netlify Dashboard)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const handler: Handler = async (event) => {
  // Only allow POST requests for this endpoint
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the incoming student profile data
    const profile = JSON.parse(event.body || "{}");

    // Construct the prompt for the AI model
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

Return JSON ONLY in exactly this format:

{
  "innovative": [],
  "advanced": [],
  "standard": []
}`;

    // Call the Groq API using the specified llama-3.3-70b-versatile model
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" } // Enforce structured JSON output
    });

    const resultText = completion.choices[0]?.message?.content || "{}";
    const resultJson = JSON.parse(resultText);

    // Return the generated ideas as a successful JSON response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultJson),
    };

  } catch (error) {
    console.error("AI Generation Error:", error);
    // Return a 500 error if anything fails during the AI generation process
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate project ideas" }),
    };
  }
};
