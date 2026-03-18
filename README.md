# ProjectPilot 🚀

An AI-powered final-year project discovery and planning tool for university students. ProjectPilot eliminates the struggle of finding a feasible and innovative project by leveraging AI to generate personalized project ideas and structured execution roadmaps based on a student's major, skills, and interests.

## Features ✨
- **AI Project Generator**: Provides tailored project suggestions using the Llama-3 70B model via the Groq API.
- **Feasibility Analysis**: Outlines complexity, required technologies, and estimated effort for each idea.
- **Smart Roadmaps**: Generates a week-by-week execution plan with milestones to ensure timely completion.
- **Modern UI**: Polished, responsive interface built with Next.js, Tailwind CSS v4, and Lucide Icons.

## Tech Stack 🛠️
- **Frontend**: Next.js (App Router), React 19, Tailwind CSS v4
- **Backend**: Next.js APIs on Leapcell
- **AI Integration**: Groq SDK (`llama-3.3-70b-versatile`)
- **Deployment**: Leapcell

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

### Deployment (Leapcell)

This project is fully configured for deployment on Leapcell.

1. Push your code to GitHub.
2. Log in to [Leapcell](https://leapcell.io).
3. Create a new service and select your GitHub repository.
4. Set the **Root directory** to `project-advisor`.
5. Ensure your Build command is set up for Next.js (`npm run build`).
6. Add your environment variable:
   - Key: `GROQ_API_KEY`, Value: *Your actual Groq API Key*
7. Deploy Site!

## License 📄
This project is licensed under the MIT License.
