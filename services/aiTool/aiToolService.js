import axios from 'axios';
import dotenv from 'dotenv';
import { analyzeWithGemini } from './geminiService.js';
import { uploadImage } from '../imageService.js';
import Chat from '../../models/chatSchema.js';

dotenv.config();

const AI_API_URL = process.env.AI_API_URL;

const getValidApiUrl = () => {
    if (!AI_API_URL) {
        throw new Error('AI_API_URL is not defined in environment variables');
    }
    
    if (!AI_API_URL.startsWith('http://') && !AI_API_URL.startsWith('https://')) {
        return `http://${AI_API_URL}`;
    }
    return AI_API_URL;
};

const convertImageForAI = (base64Image) => {
    if (!base64Image) {
        throw new Error('No image data received from AI service');
    }
    return base64Image;
};

export const analyzeDentalImage = async (imageFile, studentId, userMessage, chatId = null) => {
    try {
        let imageUrl = null;
        let imageAnalysis = null;

        if (imageFile) {
            const uploadedUrl = await uploadImage([imageFile]);
            imageUrl = uploadedUrl[0];

            const formData = new FormData();
            const imageBlob = new Blob([imageFile.buffer], { type: imageFile.mimetype || 'image/jpeg' });
            formData.append('image', imageBlob, imageFile.originalname || 'image.jpg');

            const apiUrl = getValidApiUrl();
            console.log('Making request to AI API:', apiUrl);

            const response = await axios.post(`${apiUrl}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'text/plain',
                },
                timeout: 30000,
                responseType: 'text',
                withCredentials: false // Don't send cookies
            });

            if (!response.data) {
                throw new Error('No response received from AI service');
            }

            imageAnalysis = {
                annotatedImage: convertImageForAI(response.data)
            };
        }

        const geminiResponse = await analyzeWithGemini(imageAnalysis, userMessage);

        let chat;
        if (chatId) {
            chat = await Chat.findById(chatId);
            if (!chat) throw new Error('Chat not found');
        } else {
            chat = new Chat({
                student: studentId,
                title: `Chat ${new Date().toLocaleString()}`
            });
        }

        const userMessageObj = {
            role: 'user',
            content: userMessage || 'Analyze the provided dental image'
        };

        if (imageUrl) {
            userMessageObj.image = imageUrl;
        }
        if (imageAnalysis) {
            userMessageObj.analysis = imageAnalysis;
        }

        chat.messages.push(userMessageObj);
        chat.messages.push({
            role: 'assistant',
            content: geminiResponse
        });

        await chat.save();

        return {
            success: true,
            data: {
                chatId: chat._id,
                geminiResponse,
            }
        };
    } catch (error) {
        console.error('Error in analyzeDentalImage:', error);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            console.error('Response data:', error.response.data);
        }
        throw new Error(error.response?.data || error.message || 'Failed to analyze dental image');
    }
};

export const getChats = async (studentId) => {
    try {
        const chats = await Chat.find({ student: studentId })
            .sort({ updatedAt: -1 })
            .select('title createdAt');
        return { success: true, data: chats };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getChatMessages = async (chatId, studentId) => {
    try {
        const chat = await Chat.findOne({ _id: chatId, student: studentId });
        if (!chat) throw new Error('Chat not found');
        return { success: true, data: chat.messages };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteChat = async (chatId, studentId) => {
    try {
        const chat = await Chat.findOneAndDelete({ _id: chatId, student: studentId });
        if (!chat) throw new Error('Chat not found');
        return { success: true, message: 'Chat deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}; 