import { ResponseError } from "../Error/response-error.js";


export const errorMiddleware = async (error, req, res, next) => {
   if (error instanceof ResponseError) {
      console.log("test1");
      return res.status(error.status).json({
         errors: error.message,
      });
   } else {
      console.log("test");
      return res.status(500).json({
         errors: error.message,
      });
   }
};
