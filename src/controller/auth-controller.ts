import { Request, Response } from "express";
import { register, login } from "../service/user-service";
import { StatusCodes } from "http-status-codes";

export const registerUserHandler = async ( req: Request, res: Response) => {
    
       const user = await register(req.body);
       return res.status(StatusCodes.CREATED).json(user);
};

export const loginHandler = async ( req: Request, res: Response ) => {
    
       const user = await login(req.body);
       return res.status(StatusCodes.OK).json(user)  
};
