import AddToCart from "../models/addToCart.mjs";
import mongoose from "mongoose";

export const addEntryInCart = async (req, res) => {
    const { user_id, item_id } = req.body;
    try {
        const response = await AddToCart.find({ shelterspace_id: new mongoose.Types.ObjectId(item_id), user_id: new mongoose.Types.ObjectId(user_id)});
        if (response.length > 0) {
            res.status(201).json({ message: "Item already added", created: 0 });
        } else {
            const added = new AddToCart({shelterspace_id: new mongoose.Types.ObjectId(item_id), user_id: new mongoose.Types.ObjectId(user_id)});
            await added.save();
            res.status(200).json({ message: "Item Added to Cart", created: 1 });
        }
    } catch (error) {
        res.status(201).json({ message: "Error occured at cart" });
    }
}

export const fetchItemsOfCart = async (req, res) => {
    const { user_id } = req.params;
    try {
        const response = await AddToCart.find({ user_id: new mongoose.Types.ObjectId(user_id)}).populate({   
            path: 'shelterspace_id', 
            populate: { path: 'livestock_id' },
            populate: { path: 'livestock_id' } 
        });
        if (response?.length > 0) {
            res.status(200).json({ message: "Data fetched", res: response });
        } else {
            res.status(201).json({ message: "Cart is Empty" });
        }
    } catch (error) {
        res.status(201).json({ message: "Error occured at cart" });
    }
}

export const deleteCartItems = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await AddToCart.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
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