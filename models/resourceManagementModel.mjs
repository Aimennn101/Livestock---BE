import mongoose from 'mongoose';

const resourceManagmentSchema = new mongoose.Schema({
    land_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelter',
        required: true
    },
    labor: {
        type: String,
        required: true
    },
    feed_id: {
        type    : mongoose.Schema.Types.ObjectId,
        ref: 'FeedingRoutine',
        required: true
    },
    animal_price: {
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

const ResourceManagment = mongoose.model('resourceManagment', resourceManagmentSchema);

export default ResourceManagment;
