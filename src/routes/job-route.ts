import { validateRequest } from "../middleware/auth-middleware";
import { createJobSchema } from "../schema/job-schema";
import { createJobHandler, deleteJobHandler, getAllJobsHandler, getJobHandler, updateJobHandler } from "../controller/job-controller";
import express from "express";
const router = express.Router()

router.post("/", validateRequest(createJobSchema), createJobHandler);
router.get("/", getAllJobsHandler);
router.get("/:id", getJobHandler);
router.patch("/:id", updateJobHandler);
router.delete("/:id", deleteJobHandler);

export default router
