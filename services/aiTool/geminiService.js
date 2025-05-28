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

const isDentalAnalysisRequest = (message) => {
    const dentalKeywords = [
        // General dental terms
        'dental', 'tooth', 'teeth', 'oral', 'mouth', 'jaw',
        // Types of teeth
        'incisor', 'canine', 'premolar', 'molar', 'wisdom tooth',
        'baby tooth', 'primary tooth', 'permanent tooth', 'adult tooth',
        // Dental conditions
        'cavity', 'caries', 'decay', 'gum', 'periodontal', 'gingivitis',
        'plaque', 'tartar', 'enamel', 'dentin', 'pulp', 'root',
        // Dental procedures
        'filling', 'crown', 'bridge', 'implant', 'extraction', 'root canal',
        'orthodontic', 'braces', 'denture', 'prosthetic', 'cleaning',
        // Dental analysis terms
        'analyze', 'analysis', 'diagnose', 'diagnosis', 'treatment',
        'examine', 'check', 'look at', 'assess', 'evaluate',
        // Dental anatomy
        'cusp', 'fossa', 'ridge', 'groove', 'pit', 'fissure',
        'cementum', 'periodontal ligament', 'alveolar bone',
        // Dental positions
        'mesial', 'distal', 'buccal', 'lingual', 'occlusal', 'apical'
    ];
    
    // Check if any dental keyword is present in the message
    const messageLower = message.toLowerCase();
    return dentalKeywords.some(keyword => 
        messageLower.includes(keyword.toLowerCase())
    );
};

const isGreeting = (message) => {
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => 
        message.toLowerCase().includes(greeting)
    );
};

const isSimpleQuestion = (message) => {
    const simpleQuestionPatterns = [
        'how many', 'what is', 'what are', 'where is', 'where are',
        'when do', 'when does', 'why do', 'why does'
    ];
    return simpleQuestionPatterns.some(pattern => 
        message.toLowerCase().includes(pattern)
    );
};

const isExplanationRequest = (message) => {
    const explanationKeywords = [
        'explain', 'why', 'how', 'tell me more', 'elaborate',
        'can you explain', 'could you explain', 'please explain',
        'what do you mean', 'what does that mean'
    ];
    return explanationKeywords.some(keyword => 
        message.toLowerCase().includes(keyword)
    );
};

const isFollowUpQuestion = (message) => {
    const followUpKeywords = [
        'it', 'that', 'this', 'they', 'them', 'those', 'these',
        'and', 'but', 'so', 'because', 'then', 'after', 'before',
        'why', 'how', 'what', 'when', 'where'
    ];
    return followUpKeywords.some(keyword => 
        message.toLowerCase().startsWith(keyword) || 
        message.toLowerCase().includes(` ${keyword} `)
    );
};

export const analyzeWithGemini = async (imageAnalysis, userMessage, previousMessage = null) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        let prompt;
        
        if (imageAnalysis && imageAnalysis.annotatedImage) {
            // If there's an image, always provide dental analysis
            prompt = `As a dental AI assistant, analyze this dental image:

            ${userMessage || 'Please analyze this dental image'}

            Here is the annotated image: ${imageAnalysis.annotatedImage}

            Provide a professional analysis including:
            1. Key clinical findings
            2. Possible diagnoses
            3. Treatment recommendations
            4. Relevant academic reference (if applicable)

            Keep the response focused and professional.`;
        } else {
            // For text-only messages
            if (isGreeting(userMessage)) {
                prompt = `As a friendly dental AI assistant, respond to:

                ${userMessage}

                Respond with a friendly greeting and briefly mention that you're a dental AI assistant that can help with dental-related questions and image analysis.`;
            } else if (isDentalAnalysisRequest(userMessage)) {
                if (isFollowUpQuestion(userMessage) && previousMessage) {
                    // For follow-up questions, include context from previous message
                    prompt = `As a dental AI assistant, respond to this follow-up question in the context of the previous conversation:

                    Previous message: ${previousMessage}
                    Current question: ${userMessage}

                    Provide a response that:
                    1. Maintains context from the previous message
                    2. Directly addresses the follow-up question
                    3. Connects the answer to the previous information
                    4. Keeps the response concise and relevant

                    Make sure your answer makes sense in the context of the previous message.
                    If the follow-up question is asking for an explanation, provide a detailed explanation that builds upon the previous answer.`;
                } else if (isSimpleQuestion(userMessage)) {
                    // For simple questions, provide a concise answer
                    prompt = `As a dental AI assistant, provide a clear and concise response to:

                    ${userMessage}

                    Give a direct answer in 1-2 sentences, followed by a brief explanation in 1-2 more sentences if needed.
                    Keep the response simple and easy to understand.
                    Avoid academic language and unnecessary details.`;
                } else if (isExplanationRequest(userMessage)) {
                    // For explanation requests
                    prompt = `As a dental AI assistant, provide a detailed explanation to:

                    ${userMessage}

                    Structure your response with:
                    1. A clear, direct answer to the question
                    2. A detailed explanation of why/how this is the case
                    3. Relevant anatomical or physiological details
                    4. Any important variations or exceptions (if applicable)

                    Make sure to explain the reasoning behind your answer thoroughly.`;
                } else {
                    // For questions about conditions, treatments, or advice
                    prompt = `As a dental AI assistant, provide a professional response to:

                    ${userMessage}

                    Structure your response with:
                    1. Key clinical information
                    2. Essential guidelines (if relevant to the question)
                    3. Relevant reference (if applicable)
                    4. Recommendations (only if directly related to the question)

                    Keep the response focused and practical.`;
                }
            } else {
                // For non-dental queries
                prompt = `As a dental AI assistant, respond to:

                ${userMessage}

                Politely inform the user that you are specifically designed to assist with dental-related questions and image analysis.
                Explain that you can help with:
                - Dental conditions and treatments
                - Oral health questions
                - Analysis of dental images
                - Dental procedures and recommendations
                
                Ask if they have any dental-related questions you can help with instead.`;
            }
        }

        return await generateWithRetry(model, prompt);
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error(`Failed to generate AI response: ${error.message}`);
    }
}; 