import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";

export interface UserDocument extends Document{
    name: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    createJWT(): Promise<void>;
};

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email",],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minlength: 6,
    },
})

UserSchema.pre("save", async function() {
    let user = this as UserDocument;

    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
})

UserSchema.methods.createJWT = function () {
    const user = this as UserDocument;

    return jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET as string, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UserDocument;

    const isMatch = bcrypt.compare(candidatePassword, user.password);

    return isMatch.catch(() =>  false);
}

const User = mongoose.model<UserDocument>("User", UserSchema)

export default User;
