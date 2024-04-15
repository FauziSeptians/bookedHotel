import { User } from "../model/user-model";

export async function validatingEmail (email : string){

      const exist = await User.findOne({ email: email });

      return exist;

}