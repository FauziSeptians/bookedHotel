const mongoose = require('mongoose');

const bookedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', 
    required: true
  },
  startBooked: {
    type: Date,
    required: true
  },
  endBooked: {
    type: Date,
    required: true
  },
});

export const BookedModel = mongoose.model('booked', bookedSchema);




