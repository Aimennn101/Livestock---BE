import mongoose from 'mongoose';

const UserPurchaseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shelterspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShelterSpace',
        required: true
    },
    bought_quantity: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const UserPurchase = mongoose.model('purchases', UserPurchaseSchema);

export default UserPurchase;