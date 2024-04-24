import { NewsModel } from "../model/news-model.js";
import { ResponseError } from "../Error/response-error.js";

export class newsServices {
   static async createNews(request) {
      const { Images, Title, Description } = request;

      if (!Images || !Title || !Description) {
         throw "Data must be filled";
      }

      const News = new NewsModel({
         Images: Images,
         Title: Title,
         Description: Description,
      });

      News.save();

      return News;
   }
   static async getNews() {
      const News = await NewsModel.find();

      return News;
   }

   static async delete(id) {
      if (!id) {
         throw new ResponseError(404, "Data Id must be filled");
      }

      await NewsModel.deleteOne({ _id: id });
   }

   static async update(id, newData) {
      console.log(id);
      if (!id) {
         throw new ResponseError(400, "Data Id must be filled");
      }

      const { Images, Title, Description } = newData;

      if (!Images || !Title || !Description) {
         throw "Data must be filled";
      }

      const isDataExists = await NewsModel.find({ _id: id }).countDocuments();

      console.log(isDataExists);

      if (isDataExists == 0) {
         throw new ResponseError(404, `news with ID ${id} not found`);
      }

      await NewsModel.findOneAndUpdate({ _id: id }, newData);
   }
}
