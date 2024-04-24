

export function isRoomBooked(checkinDate, checkoutDate, startBooked, endBooked) {
    // Check if Checkin and Checkout are valid Date objects
    if (!isValidDatetime(checkinDate) || !isValidDatetime(checkoutDate)) {
        console.error('Invalid Checkin or Checkout date. Please provide valid dates.');
        return false;
    }

    // Check if startBooked and endBooked are valid Date objects
    if (!isValidDatetime(startBooked) || !isValidDatetime(endBooked)) {
        console.error('Invalid startBooked or endBooked date. Please provide valid dates.');
        return false;
    }

    // 

    if((startBooked >= checkinDate && startBooked <= checkoutDate) || (endBooked >= checkinDate && endBooked <= checkoutDate)) {
        return true
    }

}


function isValidDatetime(date) {
    return !isNaN(date.getTime());
}