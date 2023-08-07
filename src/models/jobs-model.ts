import mongoose, { Types, Document } from "mongoose";

export interface JobDocument extends Document{
    company: string;
    position: string;
    status: string;
    createdBy: Types.ObjectId;
};

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide a company name"],
        maxLength: 50,
    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxLength: 100,
    },
    status: {
        type: String,
        enum: ["interviewing", "rejected", "pending"],
        default: "pending",
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    }
}, {timestamps: true})

const Job = mongoose.model<JobDocument>("Job", JobSchema)

export default Job
