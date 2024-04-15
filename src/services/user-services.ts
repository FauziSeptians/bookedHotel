import express, { Express, Request, Response } from "express";
import { User } from "../model/user-model";
import { validatingEmail } from "../utils/validatingEmail";
import { jwtSecret } from "../middleware/jwt-middleware";
import jwt from 'jsonwebtoken';

export class UserServices {
  static async Register(req: any): Promise<any> {
    const { name, email, password } = req;

    if (!name || !email || !password) {
      console.log("test");
      throw "Data must be filled";
    }

    const exists = await validatingEmail(email);

    if (exists) {
      throw "User already registered";
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    user.save();

    return user;
  }

  static async Login(req: any): Promise<any> {
    const { email, password } = req;
    if (!email || !password) {
      console.log("test");
      throw "Data must be filled";
    }

    let user = await User.findOne({ email: email });

    if(!user){
      throw "username or password wrong"
    }

    const isPasswordValid = user.password === password;

    if(!isPasswordValid){
      throw "username or password wrong"
    }
    const payload = { username: user.name };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    User.updateOne({ email: user.email }, { $set: { token: token } })

    return {
      username : user.name,
      token : token
    }
  }
}
