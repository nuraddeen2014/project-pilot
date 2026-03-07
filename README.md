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

4. Set up environment variables:
   Create a `.env.local` file in the root of the project and add your Groq API key:
   ```env
   GROQ_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## License 📄
This project is licensed under the MIT License.
