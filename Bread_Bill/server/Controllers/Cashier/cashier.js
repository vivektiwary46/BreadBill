import Bread from '../../Models/Bread.js';
import Bill from '../../Models/Bill.js';

export const createBill = async (req, res) => {
    const { bill } = req.body;

    try {
        const data = await Bill.create({ ...bill, cashier_id: req.user.id });

        res.status(201).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

export const fetchBreads = async (req, res) => {

    try {
        const data = await Bread.find();

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

export const fetchBills = async (req, res) => {

    try {
        const data = await Bill.find({ cashier_id: req.user.id }).sort({ purchasedAt: "desc" });

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}