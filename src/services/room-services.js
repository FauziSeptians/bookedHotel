import { ResponseError } from "../Error/response-error.js";
import { HotelModel } from "../model/hotel-model.js";
import { RoomModel } from "../model/room-model.js";

export class RoomServices {
   static async createRoom(dataRequest) {
      const { roomnumber, price, hotelid, types, description } = dataRequest;

      if (!roomnumber || !price || !hotelid || !types || !description) {
         throw "Data must be filled";
      }
      const isIDexists = await HotelModel.findOne({
         _id: hotelid,
      }).countDocuments();

      if (isIDexists == 0) {
         throw new ResponseError(404, "HotelID not registered");
      }

      const isRoomExists = await RoomModel.findOne({
         roomnumber: roomnumber,
      }).countDocuments();

      if (isRoomExists != 0) {
         console.log("test");
         throw new ResponseError(400, "Data Room Already Exists");
      }

      const Room = new RoomModel({
         roomnumber: roomnumber,
         price: price,
         hotelid: hotelid,
         types: types,
         description: description,
      });

      Room.save();

      return Room;
   }

   static async deleteRoom(id) {
      if (!id) {
         throw new ResponseError(404, "Data Id must be filled");
      }

      await RoomModel.deleteOne({ _id: id });
   }

   static async updateRoom(id, newData) {
      if (!id) {
         throw new ResponseError(400, "Data Id must be filled");
      }

      const { roomnumber, price, hotelid, types, description } = newData;

      if (!roomnumber || !price || !hotelid || !types || !description) {
         throw "Data must be filled";
      }

      const isDataExists = await RoomModel.find({ _id: id }).countDocuments();

      if (!isDataExists) {
         throw new ResponseError(404, `room with ID ${id} not found`);
      }

      await RoomModel.findOneAndUpdate({ _id: id }, newData);
   }

   static async getData() {
      const data = await RoomModel.find({});

      return data;
   }
}
