import { HotelModel } from "../model/hotel-model.js";

export class HotelServices {
   static async createHotel(request) {
      const { Title, Description, Detail, Policy, Price, Promo } = request;

      if (!Title || !Description || !Policy || !Price || !Detail) {
         throw "Data must be filled";
      }

      const DataHotel = new HotelModel({
         Title: Title,
         Description: Description,
         Policy: Policy,
         Price: Price,
         Promo: Promo,
         Detail: Detail,
      });

      DataHotel.save();

      return DataHotel;
   }
   static async getHotel() {
      const News = await HotelModel.find();

      return News;
   }

   static async updateHotel({ id, newData }) {
      const { Title, Description, Detail, Policy, Price } = newData;

      if (!id) {
         throw "Id must be filled";
      }

      if (!Title || !Description || !Policy || !Price || !Detail) {
         throw "Data must be filled";
      }

      const isDataExists = await HotelModel.findById(id).exec();

      if (!isDataExists) {
         throw new Error(`Hotel with ID ${id} not found`);
      }

      const Update = await HotelModel.findOneAndUpdate({ _id: id }, newData);

      return Update;
   }

   static async delete(id) {
      if (!id) {
         throw new ResponseError(404, "Data Id must be filled");
      }

      await HotelModel.deleteOne({ _id: id });
   }
}
