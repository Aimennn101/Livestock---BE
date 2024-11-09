import Veterinary from '../models/vetModel.mjs';

export const createAppointment = async (req, res) => {
    const { name, contactNumber, livestockType, expectedDate, address } = req.body;
    try {
        const newAppointment = await Veterinary.create({
            name,
            contactNumber,
            livestockType,
            expectedDate,
            address
        });
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Veterinary.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


