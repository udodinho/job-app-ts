import { object, ref, string } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        email: string().email("Must be a valid email").required("Email is required"),
        password: string().required("Password is required").min(6, "Password is too short - should be 6 character minimum").matches(/^[a-zA-Z0-9_.-]*$/, "password can only contain latin letters."),
        passwordConfirmation: string().oneOf([ref("password"), undefined], "password must match").required("Password is required"),
    }),
});

export const loginUserSchema = object({
    body: object({
        email: string().email("Must be a valid email").required("Email is required"),
        password: string().required("Password is required"),
    }),
});

