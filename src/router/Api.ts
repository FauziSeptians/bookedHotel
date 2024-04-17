import express from "express";
import { verifyJWT } from "../middleware/jwt-middleware";
import { HotelController } from "../controllers/hotel-controllers";
import { RoomController } from "../controllers/room-controller";
import { BookedController } from "../controllers/booked-controller";
import { errorMiddleware } from "../middleware/error-middleware";



export const privateRouter = express.Router();

privateRouter.use(verifyJWT);
privateRouter.use(errorMiddleware)

// Hotel
privateRouter.get("/api/hotel", HotelController.getHotel)
privateRouter.post("/api/create/hotel", HotelController.createHotel);

// Room
privateRouter.post("/api/create/room", RoomController.createRoom);
privateRouter.delete("/api/delete/room/:id", RoomController.deleteRoom);


// Booked
privateRouter.post("/api/create/booked", BookedController.create)
privateRouter.delete("/api/delete/booked/:id", BookedController.delete)
privateRouter.post("/api/available/booked", BookedController.searchAvailableRoom)
privateRouter.get("/api/booked", BookedController.getBookedRoom)


