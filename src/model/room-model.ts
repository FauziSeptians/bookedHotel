import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomnumber: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    hotelid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel', // Referensi ke HotelSchema
      required: true
    }
  });
  
  export const RoomModel = mongoose.model('Room', roomSchema);
  
