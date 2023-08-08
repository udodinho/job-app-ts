import Job, { JobDocument } from "../models/jobs-model"

type AllJob = {
    createdBy?: string
}

type job = {
    createdBy?: string;
    _id: string;
}

type input = {
    company?: string;
    position?: string;
}

export const createJob = async (input: JobDocument) => {
    
    const job = Job.create(input);

    return job;
   
};

export const getAllJob = async (createdBy: AllJob) => {
    
    const jobs = Job.find(createdBy);

    return jobs;

};

export const getJob = async (jobId: job) => {
    
    const job = Job.find(jobId);

    return job;

};
