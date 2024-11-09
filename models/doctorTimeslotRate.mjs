import mongoose from 'mongoose';

const doctorTimeslotRateSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
   fee: {
        type: Number,
        required: true
   },
   description: {
        type: String,
        default: null   
   },
   booked: {
        type:  Number, 
        default: 0
   },
   booked_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
   },
   created_at: {
     type: Date,
     default: Date.now
 }
});

const DoctorTimeSlotRates = mongoose.model('doctortimeslotrates', doctorTimeslotRateSchema);

export default DoctorTimeSlotRates;
