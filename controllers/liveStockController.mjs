import Livestock from '../models/livestockModel.mjs';

export const createLivestock = async (req, res) => {
    try {
       req.body["rem_quantity"] = req.body["quantity"];
        const livestock = new Livestock(req.body);
        await livestock.save();
        res.status(201).json(livestock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllLivestock = async (req, res) => {
    try {
        const ownerId = req.query.ownerId;
        const livestock = await Livestock.find({}).populate('owner_id shelter_id');
        res.status(200).json(livestock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getLivestockById = async (req, res) => {
    try {
        const livestock = await Livestock.findById(req.params.id).populate('owner_id shelter_id');
        if (!livestock) {
            return res.status(404).json({ message: 'Livestock not found' });
        }
        res.status(200).json(livestock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateLivestock = async (req, res) => {
    try {
        const livestock = await Livestock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!livestock) {
            return res.status(404).json({ message: 'Livestock not found' });
        }
        res.status(200).json(livestock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteLivestock = async (req, res) => {
    try {
        const livestock = await Livestock.findByIdAndDelete(req.params.id);
        if (!livestock) {
            return res.status(404).json({ message: 'Livestock not found', deleted: 0 });
        }
        res.status(200).json({ message: 'Livestock deleted', deleted: 1 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
