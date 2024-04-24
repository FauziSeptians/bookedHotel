import express from "express";
import { UserController } from "../controllers/user-controllers.js";
import { newsController } from "../controllers/news-controller.js";

export const publicRouter = express.Router();
publicRouter.get("/", (req, res) => {
   return res.status(200).send("mask");
});
publicRouter.post("/api/crete/users", UserController.Register);
publicRouter.post("/api/users", UserController.Login);
publicRouter.post("/api/create/news", newsController.createNews);
publicRouter.get("/api/news", newsController.getNews);

publicRouter.get("/data/mahasiswa", (req, res) => {
   const groupData = [
      {
         name: "Vincent Callista",
         nim: "535220075",
         image: "assets/vincent.jpg",
         quotes: "Do with your heart",
      },
      {
         name: "Yoga Ramadhani",
         nim: "535220247",
         image: "assets/yoga.jpg",
         quotes: "Money surely can buy happiness",
      },
      {
         name: "michael",
         nim: "535220248",
         image: "assets/michael.jpg",
         quotes: "Money surely can buy happiness",
      },
   ];

   return res.status(200).send({
      message: "Ok",
      statusCode: 200,
      additionalData: groupData,
   });
});
