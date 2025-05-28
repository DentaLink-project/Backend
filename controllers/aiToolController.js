import { analyzeDentalImage, getChats, getChatMessages, deleteChat } from '../services/aiTool/aiToolService.js';

export const analyzeImage = async (req, res) => {
    try {
        const { message, chatId } = req.body;
        
        if (!message && !req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'Either a message or an image must be provided' 
            });
        }

        const result = await analyzeDentalImage(
            req.file, 
            req.student._id, 
            message, 
            chatId
        );
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const fetchChats = async (req, res) => {
    try {
        const result = await getChats(req.student._id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const fetchChatMessages = async (req, res) => {
    try {
        const result = await getChatMessages(req.params.chatId, req.student._id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Chat not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteChatController = async (req, res) => {
    try {
        const result = await deleteChat(req.params.chatId, req.student._id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Chat not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 