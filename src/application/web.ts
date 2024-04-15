import express from "express";
import { publicRouter } from "../router/publicApi";
import { connectDB } from "./database";

import { privateRouter } from "../router/Api";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(privateRouter);

connectDB();
