import mongoose from 'mongoose';

const livestockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shelter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelter',
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rem_quantity: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Livestock = mongoose.model('Livestock', livestockSchema);

export default Livestock;
