import { object, string } from "yup";

export const createJobSchema = object({
    body: object({
        company: string().required("Company is required"),
        position: string().required("Position is required"),
    }),
});