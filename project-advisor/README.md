# ProjectPilot (AI Final Year Project Advisor)

A Next.js full-stack application that leverages AI (Groq + Llama 3) to generate custom-tailored final-year project ideas and structured weekly roadmaps based on a student's personal profile.

This project is built explicitly for zero-setup deployment on **Netlify** using Serverless Functions.

## 📁 Project Directory Structure

```text
ai-project-advisor/
├── src/
│   ├── app/                 # Next.js App Router (Frontend)
│   └── components/          # Reusable UI components
├── netlify/
│   └── functions/           # Netlify Serverless Backend
│         ├── generateIdeas.ts
│         └── generateRoadmap.ts
├── package.json
├── tailwind.config.ts       # Tailwind v4 configuration
├── tsconfig.json
└── netlify.toml             # Netlify deployment config
```

## 🛠️ Tech Stack
* **Frontend**: Next.js App Router, TypeScript, Tailwind CSS v4
* **Backend**: Netlify Serverless Functions (`netlify/functions`)
* **AI Provider**: Groq API (Model: `llama-3.3-70b-versatile`)
* **Deployment**: Netlify

## 💻 Local Testing & Setup

To run this project locally, you will need the Netlify CLI to properly spin up both the Next.js frontend and the local Netlify Serverless Functions layer.

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env.local` file in the root of the project to store your API key securely:
   ```env
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

3. **Install Netlify CLI (Global)**
   This CLI allows you to simulate the Netlify cloud environment locally.
   ```bash
   npm install -g netlify-cli
   ```

4. **Start the Development Server**
   Run the project using Netlify Dev to inject the serverless functions (`/.netlify/functions/*`) alongside the Next.js app on `localhost`:
   ```bash
   netlify dev
   ```
   Open your browser to the local URL provided in the terminal (usually `http://localhost:8888`). The frontend components will now be able to call the local functions successfully.

## 🚀 GitHub Integration & Deployment

### 1. Push Code to GitHub
Ensure you push your code to a GitHub repository (using the `main` branch configuration).
```bash
git init
git add -A
git commit -m "Initial commit for ProjectPilot Netlify Integration"
git branch -M main
git remote add origin https://github.com/yourusername/project-pilot.git
git push -u origin main
```

### 2. Full Netlify Deployment
This app is ready to automatically deploy.

1. Create a free account and log in to the [Netlify Dashboard](https://app.netlify.com).
2. Click **Add new site** -> **Import an existing project**.
3. Select your GitHub repository (`project-pilot`).
4. **Build settings** should automatically detect `netlify.toml`, but confirm the following:
   * **Build command**: `npm run build`
   * **Publish directory**: `.next`
   * **Functions directory**: `netlify/functions`
5. **Environment Variables**:
   * Click **Add environment variables**.
   * Key: `GROQ_API_KEY`
   * Value: *[Your actual Groq API Key]*
6. Click **Deploy Site**.

*Optional:* Once deployed, navigate to **Site configuration -> Domain management** to change your random Netlify site name to something cleaner, like `capstoneai.netlify.app`.

## 🧠 UI & UX Flow
* **Profile Setup:** The student answers questions at `/profile`. This securely calls `/.netlify/functions/generateIdeas` which passes the data to the LLaMA-3 model.
* **Project Review:** Real-time loading states are handled on the frontend. Once the JSON returns, three categories of projects render natively as customized cards.
* **Execution Maps:** Clicking "Generate Roadmap" triggers `/.netlify/functions/generateRoadmap`. The frontend then maps out the returned JSON object into a fully detailed milestone breakdown.
