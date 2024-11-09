import express from 'express';
import { createDoctorTimeslot, getDoctorTimeslot, deleteDoctorSlot, getAllTimeslots, getBookedTimeslots, bookAppointment, getBookedTimeslotsUser } from '../controllers/doctorTimeslotRateController.mjs';
const router = express.Router();

router.post("/", createDoctorTimeslot);
router.get("/", getAllTimeslots);
router.get("/:doctor_id", getDoctorTimeslot);
router.get("/user/:user_id", getBookedTimeslotsUser);
router.get("/booked/:doctor_id", getBookedTimeslots);
router.delete("/:id", deleteDoctorSlot)
router.post("/book-appointment", bookAppointment)

export default router;
