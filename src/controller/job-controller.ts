import { StatusCodes } from "http-status-codes";
import { createJob, deleteJob, getAllJob, getJob, updateJob } from "../service/job-service";
import { Request, Response } from "express";
import { NotFoundError } from "../errors/index";

export const createJobHandler = async (req: Request, res: Response) => {

    req.body.createdBy = req.user?.id;
    const job = await createJob(req.body);

    return res.status(StatusCodes.CREATED).json(job);
};

export const getAllJobsHandler = async (req: Request, res: Response) => {

    const userId = req.user?.id;

    const jobs = await getAllJob({ createdBy: userId });

    if (!jobs) {
        throw new NotFoundError("No job found");
    }

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });

};

export const getJobHandler = async (req: Request, res: Response) => {
    const { params: { id: jobId } } = req;
    const id = req.user?.id;

    const job = await getJob({ _id: jobId, createdBy: id });

    if (!job) {
        throw new NotFoundError(`No job with the id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
};

export const updateJobHandler = async (req: Request, res: Response) => {
    const { body: { company, position }, params: { id: jobId } } = req;
    const id = req.user?.id;

    const job = await updateJob({ _id: jobId, createdBy: id }, { company, position });

    if (!job) {
        throw new NotFoundError(`No job with the id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
};

export const deleteJobHandler = async (req: Request, res: Response) => {
    const { params: { id: jobId } } = req;
    const id = req.user?.id;

    const job = await deleteJob({ _id: jobId, createdBy: id });

    if (!job) {
        throw new NotFoundError(`No job with the id ${jobId}`);
    }

    res.status(StatusCodes.OK).json("Job deleted successfully");
};