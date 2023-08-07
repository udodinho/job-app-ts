import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/index";
import jwt, { JwtPayload } from "jsonwebtoken"
import { AnySchema } from "yup"


export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
  
    if (!authToken || !authToken.startsWith("Bearer")) {
        throw new ValidationError("Invalid authorization");
    }
    
    const token = authToken.split(" ")[1];
    
    try {
        const jwtToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        req.user = { id: jwtToken.userId, name: jwtToken.name };
        next();
    } catch (error) {
        throw new ValidationError("Invalid authorization")
    }
}

export const validateRequest = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    
       try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
       } catch (error) {
        throw new ValidationError("Please provide a valid credentials")
       }
}