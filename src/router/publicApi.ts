import express from "express";
import { UserController } from "../controllers/user-controllers";


export const publicRouter = express.Router();
publicRouter.get("/", (req, res) => {
      return res.status(200).send("mask")
})

publicRouter.get("/api/crete/users", UserController.Register)

