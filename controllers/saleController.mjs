import Sale from '../models/saleModel.mjs';

export const createSale = async (req, res) => {
    try {
        const sale = new Sale(req.body);
        await sale.save();
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate('livestock_id seller_id');
        res.status(200).json(sales);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('livestock_id seller_id');
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateSale = async (req, res) => {
    try {
        const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json({ message: 'Sale deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
