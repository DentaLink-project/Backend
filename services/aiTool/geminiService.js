import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateWithRetry = async (model, prompt, retryCount = 0) => {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        // Check if it's a retryable error (503 or network issues)
        const isRetryable = error.message?.includes('503') || 
                          error.message?.includes('overloaded') ||
                          error.message?.includes('network') ||
                          error.message?.includes('timeout');

        if (isRetryable && retryCount < MAX_RETRIES) {
            console.log(`Retrying Gemini API call (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
            await sleep(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
            return generateWithRetry(model, prompt, retryCount + 1);
        }

        // If we've exhausted retries or it's a non-retryable error, throw
        throw new Error(`Gemini API Error: ${error.message}`);
    }
};

export const analyzeWithGemini = async (imageAnalysis, userMessage) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        let prompt;
        
        if (imageAnalysis && imageAnalysis.annotatedImage) {
            prompt = `As a dental AI assistant specialized in academic and clinical analysis, provide a concise yet comprehensive assessment of this dental image:

            ${userMessage || 'Please provide a detailed analysis of this dental image'}

            Here is the annotated image: ${imageAnalysis.annotatedImage}

            Provide a brief but professional analysis including:
            1. Key clinical findings (2-3 most significant)
            2. Primary differential diagnosis (top 2-3 possibilities)
            3. Essential treatment recommendations
            4. One key academic reference

            Keep the response focused and concise while maintaining professional standards.`;
        } else {
            prompt = `As a dental AI assistant specialized in academic and clinical knowledge, provide a concise professional response to:

            ${userMessage}

            Structure your response with:
            1. Key clinical information
            2. Essential guidelines
            3. One relevant reference
            4. Brief recommendations

            Keep the response focused and concise while maintaining professional standards.`;
        }

        return await generateWithRetry(model, prompt);
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error(`Failed to generate AI response: ${error.message}`);
    }
}; 