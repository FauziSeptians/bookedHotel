import express from "express";
import { publicRouter } from "../router/publicApi";


export const web = express();
web.use(express.json());
web.use(publicRouter);
