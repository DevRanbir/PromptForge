import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';

export interface RecommendedTool {
  name: string;
  model: string;
  best_for: string;
  category: 'image_generation' | 'text_writing' | 'code_generation' | 'data_analysis' | 'video_generation' | 'voice_audio' | 'study_learning' | 'search_research' | 'automation_agents';
}

export interface PromptAnalysis {
  problems: string[];
  suggestedTools: RecommendedTool[];
  enhancedPrompt: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private apiKey = environment.geminiApiKey;

  get hasApiKey() {
    return !!this.apiKey;
  }

  async analyzePrompt(userPrompt: string): Promise<PromptAnalysis> {
    const key = this.apiKey;
    if (!key) throw new Error('API Key not set in environment');

    const genAI = new GoogleGenerativeAI(key);

    const systemInstruction = `
      You are an expert Prompt Engineer. Your task is to analyze the user's prompt and provide:
      1. Problem Segregation: Identify specific weaknesses in the prompt (ambiguity, lack of context, etc.).
      2. Suggested AI Tools: Recommend exactly 3-5 specific AI tools from the following categories based on their relevance to the user's task.
      
      Categories and Tools to choose from:
      - image_generation: Google Gemini (imagen/vision), OpenAI DALL·E, Midjourney, Stable Diffusion
      - text_writing: ChatGPT (gpt-4), Claude (claude-3), Google Gemini (gemini-1.5-pro)
      - code_generation: ChatGPT (gpt-4), Claude (claude-3-opus), GitHub Copilot
      - data_analysis: ChatGPT (advanced-data-analysis), Google Gemini (gemini-1.5-pro), Microsoft Copilot (excel-copilot)
      - video_generation: Runway (gen-3), Pika (pika-1.0), Synthesia (avatar-video)
      - voice_audio: ElevenLabs (voice-ai), OpenAI Whisper, Google Speech API
      - study_learning: ChatGPT (gpt-4), Claude (claude-3), Perplexity (search-ai)
      - search_research: Perplexity (pplx), Google Gemini (gemini-1.5), Microsoft Copilot (bing-ai)
      - automation_agents: OpenAI Assistants, LangChain, Auto-GPT

      3. AI Prompt Fixing: Provide a significantly improved, professional version of the prompt using best practices (Chain-of-Thought, few-shot, clear constraints).
      
      Respond only in JSON format with the following structure:
      {
        "problems": ["problem 1", "problem 2"],
        "suggestedTools": [
          {
            "name": "Tool Name",
            "model": "specific model",
            "best_for": "brief description of why this is best",
            "category": "chosen_category_id"
          }
        ],
        "enhancedPrompt": "The improved prompt goes here..."
      }
    `;

    // Try Gemini 2.0 Flash first, then 1.5 versions
    const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
    let lastError: any;

    for (const modelId of models) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelId,
          systemInstruction,
          generationConfig: { responseMimeType: 'application/json' }
        });

        const result = await model.generateContent(userPrompt);
        const response = result.response;
        return JSON.parse(response.text());
      } catch (err: any) {
        lastError = err;
        if (err.message?.includes('404')) {
          console.warn(`Model ${modelId} not found, trying next...`);
          continue;
        }
        throw err;
      }
    }

    throw lastError;
  }
}
