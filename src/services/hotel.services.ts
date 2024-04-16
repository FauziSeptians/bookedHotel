import { HotelModel } from "../model/hotel-model";
import { NewsModel } from "../model/news-model";

export class HotelServices {
  static async createHotel(request: any) {
    const { Title, Description,Detail, Policy, Price, Promo  } = request;

    if (!Title || !Description || !Policy || !Price || !Detail) {
      throw "Data must be filled";
    }

    const DataHotel = new HotelModel({
      Title: Title,
      Description: Description,
      Policy : Policy,
      Price: Price,
      Promo : Promo,
      Detail: Detail
    });

    DataHotel.save();

    return DataHotel;
  }
  static async getHotel() {
    const News = await HotelModel.find();

    return News;
  }
}
