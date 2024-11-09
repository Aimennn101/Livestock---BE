import express from 'express';
import { createSale, getAllSales, getSaleById, updateSale, deleteSale,  } from '../controllers/saleController.mjs';

const router = express.Router();

router.post('/', createSale);
router.get('/', getAllSales);
router.get('/:id', getSaleById);
router.put('/:id', updateSale);
router.delete('/:id', deleteSale);

export default router;
