import express, { Express, Request, Response } from "express";
import { HotelServices } from "../services/hotel-services";

export class HotelController {
    static async createHotel (req: Request, res: Response) {
        try{
            const data = await HotelServices.createHotel(req.body)

            return res.status(200).send({
                  status  : 200,
                  message : "news successfully created",
                  additionalData : data
            })
      }catch(err){
            return res.status(200).send({
                  status  : 500,
                  message : err,
                  additionalData : {}
            })
      }
    }

    static async getHotel(req: Request, res: Response){
      try{
            const data = await HotelServices.getHotel()

            return res.status(200).send({
                  status  : 200,
                  message : "news successfully created",
                  additionalData : data
            })
      }catch(err){
            return res.status(200).send({
                  status  : 500,
                  message : err,
                  additionalData : {}
            })
      }
    }
}