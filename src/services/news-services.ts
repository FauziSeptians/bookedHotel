import { NewsModel } from "../model/news-model";

export class newsServices {
  static async createNews(request: any) {
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
}
