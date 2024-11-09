import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    livestock_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livestock',
        required: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
