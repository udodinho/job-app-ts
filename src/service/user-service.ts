import  User from "../models/user-model";
import { ValidationError } from "../errors/index";

type payload = {
    email: string;
    password: string;
    name: string;
};

 export const register = async (input: payload) => {
 
    let existingUser = await User.findOne({ email: input.email });

    if (existingUser) {
        throw new ValidationError("Email already exists");
    }

    const user = await User.create({ ...input });
    
    const token =  user.createJWT();
    
    return { user: { name: user.name }, token };
};
