import mongoose from 'mongoose';
const shelterSpaceSchema = new mongoose.Schema({
    livestock_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livestock',
        required: true
    },
    animal_quantity: {
        type: Number,
        required: true
    },
    size_in_kg: {
        type: Number,
        required: true
    },
    shelter_type: {
        type: String,
        required: true
    },
    available_shelter: {
        type: Number,
        required: true
    },
    ventilation: {
        type: String,
        required: true
    },
    resting_area: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const ShelterSpace = mongoose.model('ShelterSpace', shelterSpaceSchema);

export default ShelterSpace;
