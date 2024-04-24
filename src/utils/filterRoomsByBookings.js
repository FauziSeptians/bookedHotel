export function filterRoomsByBookings(roomArray , bookingArray ) {
    // Extract roomIds from bookings for efficient lookup
    const bookedRoomIds = bookingArray.map((booking ) => booking.roomId.toString());
  
    return roomArray.filter((room ) => {
      const roomId = room._id.toString(); // Convert ObjectId to string for comparison
      return !bookedRoomIds.includes(roomId);
    });
  }