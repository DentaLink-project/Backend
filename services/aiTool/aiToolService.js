import axios from 'axios';
import dotenv from 'dotenv';
import { analyzeWithGemini } from './geminiService.js';
import { uploadImage } from '../imageService.js';
import Chat from '../../models/chatSchema.js';
import sharp from 'sharp';
dotenv.config();

const AI_API_URL = process.env.AI_API_URL;

const convertBase64ToJPEG = async (base64Image) => {
    if (!base64Image) {
        throw new Error('No image data received');
    }

    try {
        const base64Data = base64Image.includes('base64,') 
            ? base64Image.split('base64,')[1] 
            : base64Image;

        const imageBuffer = Buffer.from(base64Data, 'base64');

        const processedBuffer = await sharp(imageBuffer)
            .jpeg({ quality: 85 })
            .toBuffer();

        return `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;
    } catch (error) {
        console.error('Base64 image conversion error:', error);
        throw new Error('Failed to convert base64 image');
    }
};

const compressImageForAI = async (buffer) => {
    try {
        const compressedBuffer = await sharp(buffer)
            .resize(1024, 1024, { 
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 85 })
            .toBuffer();
        return compressedBuffer;
    } catch (error) {
        throw new Error(`Image compression failed: ${error.message}`);
    }
};

export const analyzeDentalImage = async (imageFile, studentId, userMessage, chatId = null, previousMessage = null) => {
    try {
        let imageUrl = null;
        let imageAnalysis = null;

        if (imageFile) {
            const uploadedUrl = await uploadImage([imageFile]);
            imageUrl = uploadedUrl[0];

            const compressedBuffer = await compressImageForAI(imageFile.buffer);
            
            const formData = new FormData();
            const imageBlob = new Blob([compressedBuffer], { type: 'image/jpeg' });
            formData.append('image', imageBlob, 'compressed-image.jpg');

            const response = await axios.post(`${AI_API_URL}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 30000,
                responseType: 'text'
            });

            if (!response.data) {
                throw new Error('No response received from AI service');
            }

            imageAnalysis = {
                annotatedImage: await convertBase64ToJPEG(response.data)
            };
        }

        const geminiResponse = await analyzeWithGemini(imageAnalysis, userMessage, previousMessage);

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