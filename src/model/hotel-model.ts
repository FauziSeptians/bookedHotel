import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Promo: {
        type: String,
        default: ''
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Policy: {
        type: String,
        required: true
    },
    Detail: {
        type: String,
        required: true
    }
});

export const HotelModel = mongoose.model('Hotel', hotelSchema);
