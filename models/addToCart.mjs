import mongoose from 'mongoose';

const addToCartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shelterspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShelterSpace",
        required: true
    }

});

const AddToCart = mongoose.model('addtocart', addToCartSchema);

export default AddToCart;