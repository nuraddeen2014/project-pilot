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
    const prompt = `You are an expert academic advisor specializing in helping final-year university students choose meaningful, feasible, and high-quality final year projects.

Your primary goal is to generate highly personalized project ideas that align with each student's academic field, personal interests, strengths, and career goals.

You must support ALL academic disciplines, including but not limited to:
- Engineering and technology
- Business and economics
- Law
- Medicine and health sciences
- Social sciences
- Arts and humanities

IMPORTANT RULES:
- Do NOT default to software, apps, or technical builds unless the student's field clearly requires it.
- For non-technical fields, prioritize research, analysis, creative work, case studies, or real-world applications.
- Always adapt your suggestions to fit the nature of the discipline.
- Avoid generic ideas. Each suggestion must feel tailored to the student.

Each project idea must:
- Be realistic within a final-year timeframe
- Be capable of achieving a high academic grade
- Be clearly connected to the student's inputs

Tone:
- Supportive and insightful
- Clear and structured
- Not overly technical unless required

Your output must strictly follow the requested JSON structure.

Generate 9 highly personalized final-year project ideas for a student based on the following profile:

Course/Major: ${profile.course || 'Not specified'}
Interests: ${profile.interests || 'Not specified'}
Strengths: ${profile.skills || 'Not specified'}
Career Goals: ${profile.goals || 'Not specified'}
Project Preference: ${profile.projectType || 'Not specified'}
Available Resources: ${profile.resources || 'None'}

Instructions:

1. Generate exactly 9 project ideas divided into 3 categories:
   - "innovative" (3 ideas: highly creative, standout projects)
   - "advanced" (3 ideas: strong, above-average projects)
   - "standard" (3 ideas: safe but high-quality projects capable of earning an A)

2. Each project must be:
   - Relevant to the student's academic field
   - Clearly connected to their interests and strengths
   - Appropriate for a final-year student

3. DO NOT force technical solutions:
   - If the field is non-technical, avoid apps, coding, or software systems
   - Instead use research, analysis, fieldwork, creative production, or practical applications

4. For each project, include exactly the following fields:
   - title
   - description
   - why_this_fits
   - approach_or_methods
   - complexity
   - estimated_time
   - expected_outcome

5. Make each idea feel unique and specific, not generic.

Return ONLY valid JSON. The output must strictly follow this exact structure and data types:
{
  "innovative": [
    {
      "title": "string",
      "description": "string",
      "why_this_fits": "string",
      "approach_or_methods": "string",
      "complexity": "low | medium | high",
      "estimated_time": "number (weeks)",
      "expected_outcome": "string"
    }
  ],
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

    const raw = completion.choices[0]?.message?.content || "{}";

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let data;

    try {
      data = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON PARSE ERROR:", err);
      console.log("RAW RESPONSE:", raw);
      throw new Error("Invalid JSON from AI");
    }

    if (!data.innovative || !data.advanced || !data.standard) {
      throw new Error("Invalid structure from AI");
    }

    // Return the generated ideas as a successful JSON response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
