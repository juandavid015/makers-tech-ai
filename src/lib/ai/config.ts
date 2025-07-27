import { createGoogleGenerativeAI } from "@ai-sdk/google";

// AI Provider configuration
export const aiConfig = {
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey: process.env.GEMINI_API_KEY,
};

// Create AI client instance
export const aiClient = createGoogleGenerativeAI(aiConfig);

// Model configuration
export const model = aiClient("gemini-2.0-flash-exp");

// Export for easy access
export { aiClient as createAIClient }; 