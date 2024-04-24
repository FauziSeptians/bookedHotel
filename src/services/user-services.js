import { User } from "../model/user-model.js";
import { validatingEmail } from "../utils/validatingEmail.js";
import { jwtSecret } from "../middleware/jwt-middleware.js";
import jwt from "jsonwebtoken";
import { ResponseError } from "../Error/response-error.js";

export class UserServices {
   static async Register(req) {
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

   static async Login(req) {
      const { email, password } = req;
      if (!email || !password) {
         console.log("test");
         throw "Data must be filled";
      }

      let user = await User.findOne({ email: email });

      if (!user) {
         throw "username or password wrong";
      }

      const isPasswordValid = user.password === password;

      if (!isPasswordValid) {
         throw "username or password wrong";
      }
      const payload = { username: user.name };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
      User.updateOne({ email: user.email }, { $set: { token: token } });

      return {
         username: user.name,
         token: token,
      };
   }

   static async deleteRoom(id) {
      if (!id) {
         throw new ResponseError(404, "Data Id must be filled");
      }

      await User.deleteOne({ _id: id });
   }

   static async getUser() {
      const data = await User.find({}, { name: 1, email: 1 });

      return data;
   }

   static async update(id, newData) {
      if (!id) {
         throw new ResponseError(400, "Data Id must be filled");
      }

      const { name, email, password } = newData;

      if (!name || !email || !password) {
         throw new ResponseError(400, "Data Id must be filled");
      }

      const isDataExists = await User.find({_id : id}).countDocuments();

      if (!isDataExists) {
         throw new ResponseError(404, `user with ID ${id} not found`);
      }

      await User.findOneAndUpdate({ _id: id }, newData);
   }
}
