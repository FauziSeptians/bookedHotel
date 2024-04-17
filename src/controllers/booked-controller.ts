import express, { Express, NextFunction, Request, Response } from "express";
import { BookedServices } from "../services/booked-services";

export class BookedController {
      static async create(req: Request, res: Response) {
            try {
                  const data = await BookedServices.create(req.body)

                  return res.status(200).send({
                        status: 200,
                        message: "news successfully created",
                        additionalData: data
                  })
            } catch (err) {
                  return res.status(200).send({
                        status: 500,
                        message: err,
                        additionalData: {}
                  })
            }
      }

      static async delete(req: Request, res: Response) {
            try {
                  await BookedServices.delete(req.params.id)

                  return res.status(200).send({
                        status: 200,
                        message: "Booked data successfully deleted",
                        additionalData: {}
                  })
            } catch (err) {
                  return res.status(200).send({
                        status: 500,
                        message: err,
                        additionalData: {}
                  })
            }
      }

      static async searchAvailableRoom(req: Request, res: Response, next: NextFunction) {
            try {
                  const data = await BookedServices.searchAvailableRoom(req.body);



                  return res.status(200).send({
                        status: 200,
                        message: "OK",
                        additionalData: data
                  })
            } catch (err) {
                  next(err)
            }

      }

      static async getBookedRoom(req: Request, res: Response, next: NextFunction) {

            try {
                  const data = await BookedServices.getBooked();

                  return res.status(200).send({
                        status: 200,
                        message: "OK",
                        additionalData: data
                  })
            } catch (err) {
                  next(err)
            }
      }
}