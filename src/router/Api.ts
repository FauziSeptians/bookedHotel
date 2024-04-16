import express from "express";
import { UserController } from "../controllers/user-controllers";

import { verifyJWT } from "../middleware/jwt-middleware";
import { HotelController } from "../controllers/hotel-controllers";


export const privateRouter = express.Router();

privateRouter.use(verifyJWT);

privateRouter.get("/api/hotel", HotelController.getHotel)
privateRouter.post("/api/create/hotel", HotelController.createHotel);

