import { RoomServices } from "../services/room-services.js";

export class RoomController {
   static async createRoom(req, res, next) {
      try {
         const data = await RoomServices.createRoom(req.body);

         return res.status(200).send({
            status: 200,
            message: "news successfully created",
            additionalData: data,
         });
      } catch (err) {
         next(err);
      }
   }

   static async deleteRoom(req, res, next) {
      try {
         await RoomServices.deleteRoom(req.params.id);

         return res.status(200).send({
            status: 200,
            message: "data successfully deleted",
            additionalData: {},
         });
      } catch (err) {
         next(err);
      }
   }

   static async updateRoom(req, res, next) {
      try {
         await RoomServices.updateRoom(req.params.id, req.body);

         return res.status(200).send({
            status: 200,
            message: "data successfully updated",
            additionalData: {},
         });
      } catch (err) {
         next(err);
      }
   }

   static async getRoom(req, res, next) {
      try {
         const data = await RoomServices.getData();

         return res.status(200).send({
            status: 200,
            message: "data successfully updated",
            additionalData: data,
         });
      } catch (err) {
         next(err);
      }
   }
}
