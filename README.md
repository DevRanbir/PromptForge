# PromptForge

**Elevate your prompts easily.**

PromptForge is a cutting-edge web application designed to transform raw ideas into powerful, AI-optimized prompts. By leveraging the power of Google's Gemini 2.0 Flash, it analyzes your input, detects weaknesses, and "forges" a refined strategy to get the best results from various AI models.

![PromptForge Logo](public/aiLOGO.jpg)

## 🚀 Key Features

*   **AI-Powered Optimization**: Instantly enhances your prompts using advanced LLM analysis (Gemini 2.0).
*   **Tooling Matrix**: Intelligently suggests the best AI tools (Midjourney, ChatGPT, Claude, etc.) for your specific task.
*   **Forging Report**: Provides a detailed breakdown of your prompt's strengths, weaknesses, and a finalized "Optimal Version".
*   **Mobile-First Design**: Features a unique parallax "sheet" layout on mobile for seamless on-the-go forging.
*   **Responsive & Themed**: Fully responsive interface with a sleek dark/light mode toggle.
*   **Modern UI**: Built with Spartan UI and TailwindCSS for a premium, accessible user experience.

## 🛠️ Tech Stack

*   **Framework**: Angular 17+ (Standalone Components)
*   **Styling**: TailwindCSS & CSS Variables
*   **UI Library**: Spartan UI (shadcn/ui for Angular)
*   **AI Engine**: Google Gemini (via Google Generative AI SDK)
*   **Animations**: Lottie & CSS Transitions

## 📦 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/prompt-forge.git
    cd prompt-forge
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a file at `src/environments/environment.ts` (and `.development.ts`) with your API key:
    ```typescript
    export const environment = {
      production: false,
      geminiApiKey: 'YOUR_GEMINI_API_KEY'
    };
    ```

4.  **Run the Application**
    ```bash
    npm start
    ```
    Navigate to `http://localhost:4200/`.

## 👨‍💻 Author

**RANBIR KHURANA**

---
*Forged with ❤️ by Ranbir Khurana.*
