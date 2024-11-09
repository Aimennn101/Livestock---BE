import DoctorTimeslotRate from "../models/doctorTimeslotRate.mjs"
import mongoose from "mongoose";

export const createDoctorTimeslot = async (req, res) => {
    const { doctor_id, start_time, end_time, fee } = req.body;

    try {
        // Validate required fields
        if (!doctor_id || !start_time || !end_time || fee === undefined) {
            return res.status(201).json({ message: 'All fields are required', inserted: 0 });
        }

        // Check if start_time is before end_time
        if (new Date(start_time) >= new Date(end_time)) {
            return res.status(201).json({ message: 'Start time must be before end time', inserted: 0 });
        }

        // Check for overlapping time slots
        const existingTimeslot = await DoctorTimeslotRate.findOne({
            doctor_id, start_time: new Date(start_time)
        });

        if (existingTimeslot) {
            return res.status(201).json({ message: 'Timeslot overlaps with an existing timeslot', inserted: 0 });
        }

        // Create new timeslot and rate
        const newTimeslot = new DoctorTimeslotRate({
            doctor_id,
            start_time,
            end_time,
            fee,
            booked: 0
        });

        await newTimeslot.save();
        res.status(200).json({ message: 'Doctor timeslot created successfully', data: newTimeslot, inserted: 1 });
    } catch (error) {
        console.error('Error creating doctor timeslot:', error);
        res.status(201).json({ error: 'Server error', message: error.message, inserted: 0 });
    }
};

export const getDoctorTimeslot = async (req, res) => {
    const { doctor_id } = req.params;
    try {
        const slots = await DoctorTimeslotRate.find({ doctor_id: doctor_id });
        if (slots) {
            res.status(200).json({ message: "Timeslot exists", slots: slots });
        } else {
            res.status(201).json({ message: "Timeslots don't exist" });
        }
    } catch (error) {
        res.status(201).json({ message: "Timeslots don't exist" });
    }
}

export const deleteDoctorSlot = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await DoctorTimeslotRate.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        if (deleted.deletedCount == 1) {
            res.status(200).json({ message: "Slot deleted successfully", deleted: 1 })
        }
        else {
            res.status(201).json({ message: "Error deleting slot", deleted: 0 });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something wrong occurred" });
        console.log(error, "error")
    }
}

export const getAllTimeslots = async (req, res) => {
    try {
        const response = await DoctorTimeslotRate.find({}).populate("doctor_id");
        if (response) {
            res.status(200).json({ message: "Timeslots fetched successfully", data: response });
        } else {
            res.status(201).json({ message: "No timeslots found" });
        }
    } catch (error) {
        res.status(201).json({ message: "Error fetching timeslots" });
    }
}

export const getBookedTimeslots = async (req, res) => {
    const { doctor_id } = req.params;
    try {
        const response = await DoctorTimeslotRate.find({doctor_id: doctor_id, booked: 1});
        if (response) {
            res.status(200).json({ message: "Booked Timeslots fetched successfully", data: response });
        } else {
            res.status(201).json({ message: "No Booked timeslots found" });
        }
    } catch (error) {
        res.status(201).json({ message: "Error fetching booked timeslots" });
    }
}

export const bookAppointment = async (req, res) => {
    const { user_id, description, timeslot_id } = req.body;
    try {
        const response = await DoctorTimeslotRate.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(timeslot_id), booked: 0 }, // Filter
            { $set: { booked: 1, description: description, booked_by: user_id } }, // Update
            { new: true }
          );

        if (response) {
            res.status(200).json({ message: "Appointment booked successfully", data: response, updated: 1 });
        } else {
            res.status(201).json({ message: "Timeslot not available", updated: 0 });
        }
    } catch (error) {
        res.status(201).json({ message: "Error booking Appointments", updated: 0 });
    }
}

export const getBookedTimeslotsUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const response = await DoctorTimeslotRate.find({booked_by: user_id, booked: 1}).populate("doctor_id").sort({ start_time: 1});
        if (response) {
            res.status(200).json({ message: "Booked Timeslots fetched successfully", data: response });
        } else {
            res.status(201).json({ message: "No Booked timeslots found" });
        }
    } catch (error) {
        res.status(201).json({ message: "Error fetching booked timeslots" });
    }
}