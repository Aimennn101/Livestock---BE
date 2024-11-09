import express from 'express';
import {
    createAppointment,
    getAllAppointments
} from '../controllers/veterinaryController.mjs';

const router = express.Router();

router.post('/createAppointment', createAppointment);
router.get('/allAppointments', getAllAppointments);

export default router;
