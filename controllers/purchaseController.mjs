import Purchase from '../models/purchaseModel.mjs';

export const createPurchase = async (req, res) => {
    try {
        const purchase = new Purchase(req.body);
        await purchase.save();
        res.status(201).json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('livestock_id buyer_id');
        res.status(200).json(purchases);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getPurchaseById = async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id).populate('livestock_id buyer_id');
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updatePurchase = async (req, res) => {
    try {
        const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deletePurchase = async (req, res) => {
    try {
        const purchase = await Purchase.findByIdAndDelete(req.params.id);
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json({ message: 'Purchase deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

