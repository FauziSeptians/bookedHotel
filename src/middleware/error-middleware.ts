import {Response, Request, NextFunction} from "express";
import { ResponseError } from "../Error/response-error";



export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {

  if (error instanceof ResponseError) {
        return res.status(error.status).json({
            errors: error.message 
        });
    } else {
        return res.status(500).json({
            errors: error.message
        });
    }
}