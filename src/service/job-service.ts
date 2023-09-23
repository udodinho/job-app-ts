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
    status?: string;
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

export const updateJob = async (jobId: job, payload: input) => {

    const updatedJob = Job.findByIdAndUpdate(jobId, payload,  {new: true, runValidators: true});

    return updatedJob;

};

export const deleteJob = async (jobId: job) => {
    
    const job = Job.findByIdAndDelete(jobId);
    
    return job;

};
