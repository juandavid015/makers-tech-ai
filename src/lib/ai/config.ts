import { createOpenAI } from "@ai-sdk/openai";

// AI Provider configuration
export const aiConfig = {
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
};

// Create AI client instance
export const aiClient = createOpenAI(aiConfig);

// Model configuration
export const model = aiClient("llama-3.1-8b-instant");

// Export for easy access
export { aiClient as createAIClient }; 