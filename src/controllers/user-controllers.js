import { UserServices } from "../services/user-services.js";

export class UserController {
   static async Register(req, res) {
      try {
         const data = await UserServices.Register(req.body);

         return res.status(200).send({
            message: "data has been created",
            status: 200,
            additionalData: data,
         });
      } catch (error) {
         console.log(error);
         return res.status(200).send({
            message: error,
            status: 500,
            additionalData: {},
         });
      }
   }
   static async Login(req, res) {
      try {
         const data = await UserServices.Login(req.body);

         console.log(data);

         return res.status(200).send({
            message: "OK",
            status: 200,
            additionalData: data,
         });
      } catch (error) {
         console.log(error);
         return res.status(200).send({
            message: error,
            status: 500,
            additionalData: {},
         });
      }
   }

   static async deleteUser(req, res, next) {
      try {
         await UserServices.deleteRoom(req.params.id);

         return res.status(200).send({
            status: 200,
            message: "user successfully deleted",
            additionalData: {},
         });
      } catch (err) {
         next(err);
      }
   }

   static async getUsers(req, res, next) {
      try {
         const data = await UserServices.getUser();

         return res.status(200).send({
            status: 200,
            message: "Ok",
            additionalData: data,
         });
      } catch (err) {
         next(err);
      }
   }

   static async update(req, res, next) {
      try {
         const data = await UserServices.update(req.params.id, req.body);

         return res.status(200).send({
            status: 200,
            message: "Ok",
            additionalData: data,
         });
      } catch (err) {
         next(err);
      }
   }
}
