import { BookedServices } from "../services/booked-services.js";

export class BookedController {
   static async create(req, res, next) {
      try {
         const data = await BookedServices.create(req.body);

         return res.status(200).send({
            status: 200,
            message: "successfully booked",
            additionalData: data,
         });
      } catch (err) {
         next(err);
      }
   }

   static async delete(req, res, next) {
      try {
         await BookedServices.delete(req.params.id);

         return res.status(200).send({
            status: 200,
            message: "Booked data successfully deleted",
            additionalData: {},
         });
      } catch (err) {
         next(err);
      }
   }

   static async searchAvailableRoom(req, res, next) {
      try {
         const data = await BookedServices.searchAvailableRoom(req.body);

         return res.status(200).send({
            status: 200,
            message: "OK",
            additionalData: data,
         });
      } catch (err) {
         next(err);
      }
   }

   static async searchSpesificAvailableRoom(req, res, next) {
      try {
         const data = await BookedServices.searchAvailableRoom(req.body);

         return res.status(200).send({
            status: 200,
            message: "OK",
            additionalData: data,
         });
      } catch (err) {
         next(err);
      }
   }

   static async getBookedRoom(req, res, next) {
      try {
         const data = await BookedServices.getBooked();

         return res.status(200).send({
            status: 200,
            message: "OK",
            additionalData: data,
         });
      } catch (err) {
         next(err);
      }
   }

   static async updateBookedRoom(req, res, next) {
      try {
         await BookedServices.updateBookedRoom(req.params.id, req.body);

         return res.status(200).send({
            status: 200,
            message: "data successfully updated",
            additionalData: {}
         });
      } catch (err) {
         next(err);
      }
   }
}
