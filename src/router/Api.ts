import express from "express";
import { UserController } from "../controllers/user-controllers";

import { verifyJWT } from "../middleware/jwt-middleware";


export const privateRouter = express.Router();

privateRouter.use(verifyJWT);

privateRouter.get("/users", (req, res) => {console.log("req, res")})
