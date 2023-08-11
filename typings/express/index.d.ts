import "express";
import { UserDocument } from "../../src/models/user-model";
declare module "express" {
    interface Request {
        user?: {
            id: string;
            name: string;
        };
    }
};
