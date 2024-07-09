import express from 'express';
import { createFeedingRoutine, getFeedingRoutines, getFeedingRoutineById, updateFeedingRoutine, deleteFeedingRoutine } from '../controllers/feedingRoutineController.mjs';

const router = express.Router();

router.post('/', createFeedingRoutine);
router.get('/', getFeedingRoutines);
router.get('/:id', getFeedingRoutineById);
router.put('/:id', updateFeedingRoutine);
router.delete('/:id', deleteFeedingRoutine);

export default router;
