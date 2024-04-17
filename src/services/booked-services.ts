import { ResponseError } from "../Error/response-error"
import { BookedModel } from "../model/booked-model"
import { RoomModel } from "../model/room-model"
import { filterRoomsByBookings } from "../utils/filterRoomsByBookings"
import {  isRoomBooked } from "../utils/validatingDateTime"



export class BookedServices {
    static async create(dataRequest : any){
        
        const {userId, roomId, startBooked, endBooked} = dataRequest

        if(!userId || !roomId || !startBooked || !endBooked){
            throw new Error("Data must be filled")
        }

        const data = new BookedModel({
            userId: userId,
            roomId : roomId,
            startBooked : startBooked,
            endBooked : endBooked,
        })

        data.save()

        await RoomModel.findOneAndUpdate({_id : data.roomId}, {bookedId : data._id})

        return data;


    }

    static async delete(id : string){
        if(!id){
            throw "Data mus be filled"
        }

        await BookedModel.deleteOne({_id : id})
    }

    static async searchAvailableRoom(dataRequest : any){

        const {Checkin, Checkout} = dataRequest;

        if(!Checkin || !Checkout){
            throw new ResponseError(400, "Data mus be filled")
        }
        const data = await BookedModel.find()
        const dataRoom = await RoomModel.find();

   

        const BookedRoom = data.filter((item : any) => {
            let checkin = new Date(Checkin)
            let checkout = new Date(Checkout)
            let startBooked = new Date(item.startBooked)
            let endBooked = new Date(item.endBooked)


            const RoomBooked = isRoomBooked( checkin  ,  checkout,  startBooked,  endBooked)
            console.log(RoomBooked);
           
            return RoomBooked;
     
        })

        console.log(BookedRoom)
        console.log(dataRoom);
        const availableRoom = filterRoomsByBookings(dataRoom, BookedRoom)


        return availableRoom;
    }

    static async getBooked (){
        const groupedData = await BookedModel.aggregate([
            {
              $lookup: {
                from: 'Room', // Join with Room collection
                localField: 'roomId', // Field in booked to join on
                foreignField: '_id', // Field in room to join on
                as: 'roomDetails', // Name for the joined room data array
              },
            },
            {
              $group: {
                _id: '$roomId', // Group by roomId
                bookings: { $push: '$$ROOT' }, // Push entire booked documents
                count: { $sum: 1 }, // Count bookings for each roomId
                roomDetails: { $first: '$roomDetails' }, // Get first room document from joined array
              },
            },
          ]);
        return groupedData;
    }

}