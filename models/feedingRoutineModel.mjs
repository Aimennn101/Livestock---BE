import mongoose from 'mongoose';

const feedingRoutineSchema = new mongoose.Schema({
    livestock_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livestock',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    feeding_time: {
        type: Date,
        required: true
    },
    feed_type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const FeedingRoutine = mongoose.model('FeedingRoutine', feedingRoutineSchema);

export default FeedingRoutine;
