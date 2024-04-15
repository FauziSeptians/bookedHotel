import express from "express";
import { UserController } from "../controllers/user-controllers";
import { newsController } from "../controllers/news-controller";


export const publicRouter = express.Router();
publicRouter.get("/", (req, res) => {

      return res.status(200).send("mask")
})
publicRouter.post("/api/crete/users", UserController.Register)
publicRouter.post("/api/users", UserController.Login)
publicRouter.post("/api/crete/news", newsController.createNews)
publicRouter.get("/api/news", newsController.getNews)

