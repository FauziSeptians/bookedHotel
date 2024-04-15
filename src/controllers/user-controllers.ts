import express, { Express, Request, Response } from "express";
import { UserServices } from "../services/user-services";

export class UserController {
      static async Register(req : Request , res : Response) {
            try{
                  const data = await UserServices.Register("Hallo")
                  console.log(data);
                  return res.send({
                        status : 200,
                        message : "API success",
                        additionalData : data
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