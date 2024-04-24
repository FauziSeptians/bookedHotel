import { ResponseError } from "../Error/response-error.js";

import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: process.env.USERNAME_EMAIL,
      pass: process.env.PASSWORD_EMAIL,
   },
});

export const sendAutomateEmail = (ReceiverEmail, Message) => {
   var mailOptions = {
      from: "fauzirandom01@gmail.com",
      to: "fauzirandom01@gmail.com",
      subject: `Contact from user`,
      text: Message,
   };
   transporter.sendMail(mailOptions, function (error, info) {
      console.log(mailOptions);
      console.log(info);
      console.log(error);
      if (error) {
         throw new ResponseError(500, error.message);
      } else {
         return "OK";
      }
   });
};
