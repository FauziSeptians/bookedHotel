import { newsServices } from "../services/news-services";
import express, { Express, Request, Response } from "express";

export class newsController {
      static async createNews (req: Request, res: Response){
            try{
                  const data = await newsServices.createNews(req.body)

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

      static async getNews (req : Request, res : Response){
            try{
                  const data = await newsServices.getNews()

                  return res.status(200).send({
                        status  : 200,
                        message : "OK",
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