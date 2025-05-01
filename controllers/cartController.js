import { addToCartService } from "../services/carts/addToCartServices.js";
import { decrementCartItemService } from "../services/carts/decrementCartServices.js";
import { getCartService } from "../services/carts/getCartServices.js";
import { incrementCartItemService } from "../services/carts/incrementCartItemServices.js";
import { removeCartItemService } from "../services/carts/removeCartServices.js";
import { getSuggestedToolsService } from "../services/carts/suggestionService.js";



export const addToCart = async (req, res) => {
    try {
        const cart = await addToCartService(req.student._id, req.body.toolId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const incrementCartItem = async (req, res) => {
    try {
        const cart = await incrementCartItemService(req.student._id, req.params.toolId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const decrementCartItem = async (req, res) => {
    try {
        const cart = await decrementCartItemService(req.student._id, req.params.toolId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const removeCartItemController = async (req, res) => {
    try {
        const studentId = req.student._id;
        const { toolId } = req.params;

        const result = await removeCartItemService(studentId, toolId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await getCartService(req.student._id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getSuggestedTools = async (req, res) => {
    try {
        const studentId = req.student._id;
        const tools = await getSuggestedToolsService(studentId);
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




