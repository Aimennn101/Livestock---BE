import express from 'express';
import { addEntryInCart, fetchItemsOfCart, deleteCartItems } from '../controllers/addToCartController.mjs';

const router = express.Router();

router.post("/", addEntryInCart);
router.get("/:user_id", fetchItemsOfCart);
router.delete("/:id", deleteCartItems);

export default router;