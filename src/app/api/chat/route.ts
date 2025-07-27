import { systemPrompt, model } from "@/lib/ai";
import { smoothStream, streamText } from "ai";
import { tools } from "@/lib/ai/tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error('Invalid JSON in request body', error);
      return new Response('Invalid JSON in request body', { status: 400 });
    }

    const { messages } = body;

    // Validate required fields
    if (!messages || !Array.isArray(messages)) {
      console.error('Messages array is required');
      return new Response('Messages array is required', { status: 400 });
    }

    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GOOGLE_API_KEY is not configured');
      return new Response('API key not configured', { status: 500 });
    }

    const result = streamText({
      model,
      system: systemPrompt,
      messages,
      maxSteps: 3,
      maxTokens: 500,
      tools,
      experimental_transform: smoothStream({
        delayInMs: 20,
        chunking: 'word',
      }),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return appropriate error response
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}


