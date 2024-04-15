import express, { Express, Request, Response } from "express";
import cors from "cors";
import { UserController } from "./src/controllers/user-controllers";
import { web } from "./src/application/web";

web.listen(5000, () => {
  console.log("Listening on port 5000");
})

