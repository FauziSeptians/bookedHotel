import { newsServices } from "../services/news-services.js";

export class newsController {
   static async createNews(req, res) {
      try {
         const data = await newsServices.createNews(req.body);

         return res.status(200).send({
            status: 200,
            message: "news successfully created",
            additionalData: data,
         });
      } catch (err) {
         return res.status(200).send({
            status: 500,
            message: err,
            additionalData: {},
         });
      }
   }

   static async getNews(req, res) {
      try {
         const data = await newsServices.getNews();

         return res.status(200).send({
            status: 200,
            message: "OK",
            additionalData: data,
         });
      } catch (err) {
         return res.status(200).send({
            status: 500,
            message: err,
            additionalData: {},
         });
      }
   }

   static async deleteNews(req, res, next) {
      try {
         await newsServices.delete(req.params.id);

         return res.status(200).send({
            status: 200,
            message: "news successfully deleted",
            additionalData: {},
         });
      } catch (err) {
         next(err);
      }
   }

   static async updateNews(req, res, next) {
      try {
         await newsServices.update(req.params.id, req.body);

         return res.status(200).send({
            status: 200,
            message: "news successfully updated",
            additionalData: {},
         });
      } catch (err) {
         next(err);
      }
   }
}
