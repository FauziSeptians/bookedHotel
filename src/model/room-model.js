import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
   roomnumber: {
      type: String,
      required: true,
      unique: true,
   },
   price: {
      type: Number,
      required: true,
   },
   types: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   hotelid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel", // Referensi ke HotelSchema
      required: true,
   },
   bookedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booked",
   },
});

export const RoomModel = mongoose.model("Room", roomSchema);
