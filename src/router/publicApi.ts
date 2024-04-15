import express from "express";
import { UserController } from "../controllers/user-controllers";


export const publicRouter = express.Router();
publicRouter.get("/", (req, res) => {
      return res.status(200).send("mask")
})
publicRouter.post("/api/crete/users", UserController.Register)
publicRouter.post("/api/users", UserController.Login)

