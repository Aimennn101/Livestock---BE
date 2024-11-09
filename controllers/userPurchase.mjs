import UserPurchase from "../models/userPurchase.mjs";
import AddToCart from "../models/addToCart.mjs";
import mongoose from "mongoose";

export const getUserPurchasedItems = async (req, res) => {
    const { id } = req.params;
    try {
      const animal = await UserPurchase.find({user_id: id}).populate({   
        path: 'shelterspace_id', 
        populate: { path: 'livestock_id' } 
    })
    
      if(animal) {
        res.status(200).json({animal});
      }
      else {
        res.status(201).json({message: "Data does not exist"});
      }
    } catch (error) {
      console.error('Error during fetching:', error.message);
      res.status(500).json({ error: 'Server error' });
}
}

export const purchaseItem = async (req, res) => {
    const { user_id, shelter_id, quant, cart_id, live } = req.body;
    try {
        const purchase = new UserPurchase({
            user_id: user_id,
            shelterspace_id: shelter_id,
            bought_quantity: quant
        });
        await purchase.save();

        const deleted = await AddToCart.deleteOne({_id: new mongoose.Types.ObjectId(cart_id)});
        console.log(deleted);

        res.status(200).json({message: "Item Purchased Successfully", purchased: 1});
    }
    catch(error) {
        res.status(201).json({message: "Error purchasing item", purchased: 0})
        console.log(error);
    }
}

export const deletePurchasedItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await UserPurchase.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        if(deleted.deletedCount == 1) {
            res.status(200).json({message: "Item deleted successfully", deleted: 1})
        }
        else {
            res.status(201).json({message: "Error deleting item", deleted: 0});
        }
    }
    catch(error) {
        res.status(500).json({message: "Something wrong occurred"});
        console.log(error, "error")
    }
}

