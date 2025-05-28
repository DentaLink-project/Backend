import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    analysis: {
        type: Object,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    messages: [messageSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat; 