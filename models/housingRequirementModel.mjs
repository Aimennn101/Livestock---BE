import mongoose from 'mongoose';

const housingRequirementSchema = new mongoose.Schema({
    livestock_type: {
        type: String,
        required: true
    },
    space_required: {
        type: Number,
        required: true
    },
    shelter_type: {
        type: String,
        required: true
    },
    temperature_range: {
        type: String
    },
    ventilation: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const HousingRequirement = mongoose.model('HousingRequirement', housingRequirementSchema);

export default HousingRequirement;
