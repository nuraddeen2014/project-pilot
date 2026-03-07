# ProjectPilot 🚀

An AI-powered final-year project discovery and planning tool for university students. ProjectPilot eliminates the struggle of finding a feasible and innovative project by leveraging AI to generate personalized project ideas and structured execution roadmaps based on a student's major, skills, and interests.

## Features ✨
- **AI Project Generator**: Provides tailored project suggestions using the Llama-3 70B model via the Groq API.
- **Feasibility Analysis**: Outlines complexity, required technologies, and estimated effort for each idea.
- **Smart Roadmaps**: Generates a week-by-week execution plan with milestones to ensure timely completion.
- **Modern UI**: Polished, responsive interface built with Next.js, Tailwind CSS v4, and Lucide Icons.

## Tech Stack 🛠️
- **Frontend**: Next.js (App Router), React 19, Tailwind CSS v4
- **Backend**: Next.js API Routes (Serverless ready)
- **AI Integration**: Groq SDK (`llama-3.3-70b-versatile`)
- **Deployment**: Vercel / Netlify ready

## Getting Started 🚀

### Prerequisites
- Node.js 18+
- Git
- A [Groq API Key](https://console.groq.com)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nuraddeen2014/project-pilot.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd project-advisor
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Deployment (Netlify)

This project is fully configured for zero-setup deployment on Netlify using the `@netlify/plugin-nextjs`. Netlify will automatically detect the Next.js App Router and deploy your API routes (`src/app/api`) as globally distributed Serverless Functions.

1. Push your code to GitHub.
2. Log in to [Netlify](https://app.netlify.com).
3. Click **Add new site** -> **Import an existing project**.
4. Select your GitHub repository.
5. In the build settings, ensure:
   - **Base directory:** `project-advisor`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Add your environment variables:
   - Key: `GROQ_API_KEY`, Value: *Your actual Groq API Key*
7. Click **Deploy Site**.

## License 📄
This project is licensed under the MIT License.
