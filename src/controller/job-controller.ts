import { StatusCodes } from "http-status-codes";
import { createJob, getAllJob } from "../service/job-service";
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
