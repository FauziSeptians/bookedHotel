import express, { Express, Request, Response } from "express";

export class UserController {
      static async Register(req : Request , res : Response) {
            try{
                  return res.send({
                        status : 200,
                        message : "API success",
                        additionalData : []
                  })
            }catch(error){
                  return res.status(200).send({
                        status : 500,
                        message : error,
                        additionalData : []
                  })
            }
      }
}