import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
      Images : {type : Array<String>, required: true},
      Title : {type : String, required: true},
      Description : {type : String, required: true},
      Date : {type : Date, default: Date.now}
})

export const NewsModel = mongoose.model("News", NewsSchema);