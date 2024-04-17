import { ResponseError } from "../Error/response-error";
import { HotelModel } from "../model/hotel-model";
import { RoomModel } from "../model/room-model";

export class RoomServices {
    static async createRoom(dataRequest: any) {


        const { roomnumber, price, hotelid } = dataRequest;

        if (!roomnumber || !price || !hotelid) {
            throw "Data must be filled"
        }
        const isIDexists = await HotelModel.findOne({ _id: hotelid }).countDocuments();

        if (isIDexists == 0) {
            throw new ResponseError(404, "HotelID not registered");
        }

        const isRoomExists = await RoomModel.findOne({roomnumber: roomnumber}).countDocuments();

        if (isRoomExists != 0) {
            console.log("test");
            throw new ResponseError(400, "Data Room Already Exists");
        }

        const Room = new RoomModel({
            roomnumber: roomnumber,
            price: price,
            hotelid: hotelid,
        });

        Room.save();

        return Room

    }

    static async deleteRoom (id : string){
        if(!id){
            throw new ResponseError(404,  "Data Id must be filled");
        }

        await RoomModel.deleteOne({_id : id});
    }
}
