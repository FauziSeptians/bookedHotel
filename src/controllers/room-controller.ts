import { MongooseError } from "mongoose";
import { RoomServices } from "../services/room-services"
import express, { Express, Request, Response, NextFunction } from "express";

export class RoomController {
      static async createRoom(req: Request, res: Response, next: NextFunction) {
            try {
                  const data = await RoomServices.createRoom(req.body)

                  return res.status(200).send({
                        status: 200,
                        message: "news successfully created",
                        additionalData: data
                  })
            } catch (err) {
                  next(err);
            }
      }
      
      static async deleteRoom(req: Request, res: Response, next: NextFunction) {
            try {
                  await RoomServices.deleteRoom(req.params.id)

                  return res.status(200).send({
                        status: 200,
                        message: "data successfully deleted",
                        additionalData: {}
                  })
            } catch (err) {
                  next(err);
            }
      }
}