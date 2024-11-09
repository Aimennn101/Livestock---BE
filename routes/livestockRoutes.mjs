import express from 'express';
import { createLivestock, getAllLivestock, getLivestockById, updateLivestock, deleteLivestock } from '../controllers/liveStockController.mjs';

const router = express.Router();

router.post('/', createLivestock);
router.get('/', getAllLivestock);
router.get('/:id', getLivestockById);
router.put('/:id', updateLivestock);
router.delete('/:id', deleteLivestock);

export default router;
