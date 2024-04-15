import express, { Express, Request, Response } from "express";
import { UserServices } from "../services/user-services";
import { User } from "../model/user-model";

export class UserController {
  static async Register(req: Request, res: Response) {
    try {

      const data = await UserServices.Register(req.body);

      return res.status(200).send({
        message: "data has been created",
        status: 200,
        additionalData: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(200).send({
        message: error,
        status: 500,
        additionalData: {},
      });
    }
  }
  static async Login(req: Request, res: Response) {
      try {
  
        const data = await UserServices.Login(req.body);

        console.log(data)
  
        return res.status(200).send({
          message: "OK",
          status: 200,
          additionalData: data,
        });
      } catch (error) {
        console.log(error);
        return res.status(200).send({
          message: error,
          status: 500,
          additionalData: {},
        });
      }
    }
}
