import { ResponseError } from "../Error/response-error.js";
import { BookedModel } from "../model/booked-model.js";
import { RoomModel } from "../model/room-model.js";
import { User } from "../model/user-model.js";
import { filterRoomsByBookings } from "../utils/filterRoomsByBookings.js";
import { isRoomBooked } from "../utils/validatingDateTime.js";

export class BookedServices {
   static async create(dataRequest) {
      const { userId, roomId, startBooked, endBooked } = dataRequest;

      if (new Date(startBooked) > new Date(endBooked)) {
         throw new Error("startbooked must be before endbooked");
      }

      if (
         new Date(startBooked) < new Date() ||
         new Date(endBooked) < new Date()
      ) {
         throw new Error("wrong startbooked data");
      }

      if (!userId || !roomId || !startBooked || !endBooked) {
         throw new Error("Data must be filled");
      }

      const isUserIdExist = await User.findOne({
         _id: userId,
      }).countDocuments();
      const isRoomExists = await RoomModel.findOne({
         _id: roomId,
      }).countDocuments();
      const dataBooked = await BookedModel.find();
      const dataRoom = await RoomModel.find();

      let Checkin = startBooked;
      let Checkout = endBooked;

      console.log(isUserIdExist);
      console.log(isRoomExists);

      if (isUserIdExist == 0) {
         throw new ResponseError(404, "UserID not found");
      }

      if (isRoomExists == 0) {
         throw new ResponseError(404, "RoomID not found");
      }

      const BookedRoom = dataBooked.filter((item) => {
         let checkin = new Date(Checkin);
         let checkout = new Date(Checkout);
         let startBooked = new Date(item.startBooked);
         let endBooked = new Date(item.endBooked);

         const RoomBooked = isRoomBooked(
            checkin,
            checkout,
            startBooked,
            endBooked
         );
         console.log(RoomBooked);

         return RoomBooked;
      });

      console.log(BookedRoom);
      console.log(dataRoom);

      const availableRoom = filterRoomsByBookings(dataRoom, BookedRoom);

      console.log("awdawdaw");
      console.log(availableRoom);

      const isRoomAvailable = availableRoom.filter(
         (item) => item._id == roomId
      ).length;

      console.log(isRoomAvailable);
      if (isRoomAvailable == 0) {
         throw new ResponseError(400, "Sorry this room already booked");
      }

      const data = new BookedModel({
         userId: userId,
         roomId: roomId,
         startBooked: startBooked,
         endBooked: endBooked,
      });

      data.save();

      await RoomModel.findOneAndUpdate(
         { _id: data.roomId },
         { bookedId: data._id }
      );
   }

   static async delete(id) {
      if (!id) {
         throw "Data mus be filled";
      }

      await BookedModel.deleteOne({ _id: id });
   }

   static async searchAvailableRoom(dataRequest) {
      const { Checkin, Checkout } = dataRequest;

      if (!Checkin || !Checkout) {
         throw new ResponseError(400, "Data mus be filled");
      }
      const data = await BookedModel.find();
      const dataRoom = await RoomModel.find().populate("hotelid");

      const BookedRoom = data.filter((item) => {
         let checkin = new Date(Checkin);
         let checkout = new Date(Checkout);
         let startBooked = new Date(item.startBooked);
         let endBooked = new Date(item.endBooked);

         const RoomBooked = isRoomBooked(
            checkin,
            checkout,
            startBooked,
            endBooked
         );
         console.log(RoomBooked);

         return RoomBooked;
      });

      console.log(BookedRoom);
      console.log("--------");
      console.log(dataRoom);
      const availableRoom = filterRoomsByBookings(dataRoom, BookedRoom);

      return availableRoom;
   }

   static async getBooked() {
      const groupedData = BookedModel.aggregate([
         {
            $lookup: {
               from: "rooms",
               localField: "roomId",
               foreignField: "_id",
               as: "roomDetails",
            },
         },
         {
            $lookup: {
               from: "users",
               localField: "userId",
               foreignField: "_id",
               as: "userDetails",
            },
         },
         {
            $group: {
               _id: "$roomId",
               roomDetails: {
                  $first: {
                     roomNumber: { $first: "$roomDetails.roomnumber" },
                     price: { $first: "$roomDetails.price" },
                  },
               },

               bookings: {
                  $push: {
                     _id: "$_id",
                     userId: "$userId",
                     user: { $first: "$userDetails.name" }, // Access roomNumber from joined roomDetails
                     startBooked: {
                        $dateToString: {
                           format: "%d-%m-%Y",
                           date: "$startBooked",
                        },
                     },
                     endBooked: {
                        $dateToString: {
                           format: "%d-%m-%Y",
                           date: "$endBooked",
                        },
                     },
                  },
               },
            },
         },
      ]);

      return groupedData;
   }

   static async updateBookedRoom(id, newData) {
      if (!id) {
         throw new ResponseError(400, "Data Id must be filled");
      }

      const { userId, roomId, startBooked, endBooked } = newData;

      if (new Date(startBooked) > new Date(endBooked)) {
         throw new Error("startbooked must be before endbooked");
      }

      if (
         new Date(startBooked) < new Date() ||
         new Date(endBooked) < new Date()
      ) {
         throw new Error("wrong startbooked data");
      }

      if (!userId || !roomId || !startBooked || !endBooked) {
         throw new Error("Data must be filled");
      }

      const isDataExist = await BookedModel.findOne({
         _id: id,
      }).countDocuments();

      console.log(isDataExist)

      if (isDataExist == 0) {
         throw new ResponseError(400, "Data id not found");
      }
      await BookedModel.findOneAndUpdate({ _id: id }, newData);
   }

   static async searchSpesificAvailableRoom(dataRequest) {
      const { Checkin, Checkout, HotelID } = dataRequest;

      if (!Checkin || !Checkout) {
         throw new ResponseError(400, "Data mus be filled");
      }
      const data = await BookedModel.find();
      const dataRoom = await RoomModel.find();

      const BookedRoom = data.filter((item) => {
         let checkin = new Date(Checkin);
         let checkout = new Date(Checkout);
         let startBooked = new Date(item.startBooked);
         let endBooked = new Date(item.endBooked);

         const RoomBooked = isRoomBooked(
            checkin,
            checkout,
            startBooked,
            endBooked
         );
         console.log(RoomBooked);

         return RoomBooked;
      });

      console.log(BookedRoom);
      console.log(dataRoom);

      const availableRoom = filterRoomsByBookings(dataRoom, BookedRoom);

      const dataFilteredByHotel = availableRoom.filter(
         (item) => item.hotelId === HotelID
      );

      return dataFilteredByHotel;
   }
}
