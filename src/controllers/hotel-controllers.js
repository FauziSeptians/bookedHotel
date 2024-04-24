
import { HotelServices } from "../services/hotel-services.js";

export class HotelController {
    static async createHotel (req, res) {
        try{
            const data = await HotelServices.createHotel(req.body)

            return res.status(200).send({
                  status  : 200,
                  message : "hotel successfully created",
                  additionalData : data
            })
      }catch(err){
            return res.status(200).send({
                  status  : 500,
                  message : err,
                  additionalData : {}
            })
      }
    }

    static async getHotel(req, res){
      try{
            const data = await HotelServices.getHotel()

            return res.status(200).send({
                  status  : 200,
                  message : "OK",
                  additionalData : data
            })
      }catch(err){
            return res.status(200).send({
                  status  : 500,
                  message : err,
                  additionalData : {}
            })
      }
    }

    static async deleteHotel(req, res, next ) {
      try {
            await HotelServices.delete(req.params.id)

            return res.status(200).send({
                  status: 200,
                  message: "Hotel data successfully deleted",
                  additionalData: {}
            })
      } catch (err) {
            next(err);
      }
}
}