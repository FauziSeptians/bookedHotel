export function filterRoomsByBookings(roomArray : any, bookingArray : any) {
    // Extract roomIds from bookings for efficient lookup
    const bookedRoomIds = bookingArray.map((booking : any) => booking.roomId.toString());
  
    return roomArray.filter((room : any) => {
      const roomId = room._id.toString(); // Convert ObjectId to string for comparison
      return !bookedRoomIds.includes(roomId);
    });
  }