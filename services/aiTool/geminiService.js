import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error(`Failed to generate AI response: ${error}`);
    }
}; 