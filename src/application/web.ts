import express from "express";
import { publicRouter } from "../router/publicApi";
import { connectDB } from "./database";

import { privateRouter } from "../router/Api";
import { errorMiddleware } from "../middleware/error-middleware";


export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware );

connectDB();
