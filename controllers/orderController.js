import { createOrderService } from "../services/orders/createOrderServices.js";
import { getOrderSummaryService } from "../services/orders/getOrderSummaryServices.js";
import { deleteOrderService } from "../services/orders/deleteOrder.js";

export const createOrderController = async (req, res) => {
    try {
        const studentId = req.student._id;
        const order = await createOrderService(studentId);
        res.status(201).json({ message: "Order placed", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderSummary = async (req, res) => {
    try {
        const studentId = req.student._id;
        const summary = await getOrderSummaryService(studentId);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrderController = async (req, res, next) => {
    try {
        const studentId = req.student;
        const { orderId } = req.params;

        const result = await deleteOrderService(orderId, studentId);

        res.status(200).json(result);
        } catch (err) {
            next(err);
        }
};



