import express from 'express';
import { getUserPurchasedItems, purchaseItem, deletePurchasedItem } from '../controllers/userPurchase.mjs';
const router = express.Router();

router.get("/:id", getUserPurchasedItems);
router.post("/", purchaseItem);
router.delete("/:id", deletePurchasedItem);

export default router;