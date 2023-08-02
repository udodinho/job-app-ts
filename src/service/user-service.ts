import  User, { UserDocument } from "../models/user-model";
import { omit } from "lodash";
import { ValidationError, UnauthenticatedError } from "../errors/index";

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

export const login = async (input: UserDocument) => {
    const { email, password } = input;

    if (!email || !password) {
        throw new ValidationError("Please provide an email or password");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("User not found");
    }

    const isPassword = await validPassword({ email, password });
    
    if (!isPassword) {
        throw new ValidationError("Password is incorrect");
    }

    const token = user.createJWT();

    return { user: {name: user.name }, token};
}

export const validPassword = async function ({ email, password, }: { email: UserDocument["email"], password: string }) {
    
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("User not found");
    }

    const isMatch = await user.comparePassword(password);    

    if (!isMatch) {
        throw new ValidationError("Password is incorrect");
    }

    return omit(user.toJSON(), "password");
}

