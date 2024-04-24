import express from "express";
import { verifyJWT } from "../middleware/jwt-middleware.js";
import { HotelController } from "../controllers/hotel-controllers.js";
import { RoomController } from "../controllers/room-controller.js";
import { BookedController } from "../controllers/booked-controller.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { ResponseError } from "../Error/response-error.js";
import { sendAutomateEmail } from "../utils/sendToEmail.js";
import { NewsModel } from "../model/news-model.js";
import { newsController } from "../controllers/news-controller.js";
import { UserController } from "../controllers/user-controllers.js";

export const privateRouter = express.Router();

privateRouter.use(verifyJWT);
privateRouter.use(errorMiddleware);

// Hotel
privateRouter.get("/api/hotel", HotelController.getHotel);
privateRouter.post("/api/create/hotel", HotelController.createHotel);
privateRouter.delete("/api/delete/hotel/:id", HotelController.deleteHotel);

// Room
privateRouter.post("/api/create/room", RoomController.createRoom);
privateRouter.delete("/api/delete/room/:id", RoomController.deleteRoom);
privateRouter.patch("/api/update/room/:id", RoomController.updateRoom);
privateRouter.get("/api/room", RoomController.getRoom);

// Booked
privateRouter.post("/api/create/booked", BookedController.create);
privateRouter.delete("/api/delete/booked/:id", BookedController.delete);
privateRouter.post(
   "/api/available/booked",
   BookedController.searchAvailableRoom
);
privateRouter.post(
   "/api/available/hotel/booked",
   BookedController.searchSpesificAvailableRoom
);
privateRouter.get("/api/booked", BookedController.getBookedRoom);
privateRouter.patch("/api/update/booked/:id", BookedController.updateBookedRoom);

// News
privateRouter.delete("/api/delete/news/:id", newsController.deleteNews);
privateRouter.patch("/api/update/news/:id", newsController.updateNews);

// Users
privateRouter.delete("/api/delete/user/:id", UserController.deleteUser);
privateRouter.get("/api/get/users", UserController.getUsers);
privateRouter.patch("/api/update/users/:id", UserController.update);

// Color
privateRouter.get("/api/color", (req, res) => {
   const color = req.body.color;

   if (!color) {
      throw new ResponseError(404, "Data color not found");
   }

   if (color == "black") {
      res.status(200).send({
         message: "OK",
         statusCode: 200,
         additionalData: "white",
      });
   } else {
      res.status(200).send({
         message: "OK",
         statusCode: 200,
         additionalData: "black",
      });
   }
});

privateRouter.post("/api/contact", (req, res, next) => {
   const { name, email, description } = req.body;

   if (!name || !email || !description) {
      throw new ResponseError(404, "Data must be filled");
   }

   console.log(name, email, description);
   const message = `name : ${name}\nemail :${email}\ndescription : ${description}`;

   try {
      sendAutomateEmail(email, message);

      res.status(200).send({
         message: `OK`,
         statusCode: 200,
         additionalData: {},
      });
   } catch (error) {
      next(error);
   }
});
