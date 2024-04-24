import { User } from "../model/user-model.js";

export async function validatingEmail (email ){

      const exist = await User.findOne({ email: email });

      return exist;

}