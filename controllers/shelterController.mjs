import Shelter from '../models/shelterModel.mjs';
import mongoose from 'mongoose';

export const createShelter = async (req, res) => {
    try {
        const shelter = new Shelter(req.body);
        await shelter.save();
        res.status(201).json(shelter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllShelters = async (req, res) => {
    try {
        // Query for shelters
        // const shelters = await Shelter.find({ user_id: ObjectId('64aef0f1f8e1a2b8e9a1f1e0') });
        const shelters = await Shelter.find({});
        if (!shelters || shelters.length === 0) {
            return res.status(404).json({ message: 'Shelters not found' });
        }
        res.status(200).json( shelters );
    } catch (error) {
        console.log(error,"errorerror")
        res.status(400).json({ error: error.message });
    }
};

export const getShelterById = async (req, res) => {
    try {
        const shelter = await Shelter.findById(req.params.id).populate('user_id');
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        res.status(200).json(shelter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateShelter = async (req, res) => {
    try {
        const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        res.status(200).json(shelter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteShelter = async (req, res) => {
    try {
        const shelter = await Shelter.findByIdAndDelete(req.params.id);
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        res.status(200).json({ message: 'Shelter deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getSheltersListAgainstId = async (req, res) => {
    try {
        const userId = '64aef0f1f8e1a2b8e9a1f1e0';

        // Convert the string to an ObjectId
        const objectId = mongoose.Types.ObjectId(userId);
        const shelter = await Shelter.find({user_id : objectId});
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        res.status(200).json({ records: shelter });
    } catch (error) {
        console.log(error,"errorerror")
        res.status(400).json({ error: error.message });
    }
};
