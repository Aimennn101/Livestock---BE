import ShelterSpace from '../models/shelterSpace.mjs';
import UserPurchase from '../models/userPurchase.mjs';
import mongoose from 'mongoose';

export const addShelterSpace = async (req, res) => {
    try {
        const shelterspace = new ShelterSpace(req.body);
        await shelterspace.save();
        res.status(201).json(shelterspace);
    } catch (error) {
        console.log(error.message, "error")
        res.status(400).json({ error: error.message });
    }
};

export const getAllShelterSpace = async (req, res) => {
    const {id} =req.params;
    try {
        const updatedShelterSpaces = await ShelterSpace.aggregate([
            {
                $lookup: {
                    from: 'livestocks', // The name of the Livestock collection in MongoDB
                    localField: 'livestock_id',
                    foreignField: '_id',
                    as: 'livestock'
                }
            },
            {
                $unwind: '$livestock' // Unwind the populated livestock array to treat it as a single object
            },
            {
                $match: {
                    'livestock.rem_quantity': { $gt: 0 } // Filter based on rem_quantity in Livestock
                }
            },
            {
                $addFields: {
                    livestock_id: '$livestock' // Reassign livestock data to livestock_id for the populated effect
                }
            },
        ]);
        res.status(201).json(updatedShelterSpaces);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const getShelterSpaceById = async (req, res) => {
    try {
        const shelter = await ShelterSpace.findById(req.params.id).populate('livestock_id');
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        res.status(200).json(shelter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const updateShelterSpace = async (req, res) => {
    try {
        const shelterSpace = await ShelterSpace.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!shelterSpace) {
            return res.status(404).json({ message: 'Shelter space not found' });
        }
        res.status(200).json(shelterSpace);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteShelterSpace = async (req, res) => {
    try {
        const shelterSpace = await ShelterSpace.findByIdAndDelete(req.params.id);
        if (!shelterSpace) {
            return res.status(404).json({ message: 'Shelter space not found', deleted: 0 });
        }
        res.status(200).json({ message: 'Shelter space deleted', deleted: 1 });
    } catch (error) {
        res.status(400).json({ error: error.message, deleted: 0 });
    }
};