import { Router } from "express";
import { jobController } from "../controllers/jobs";

const jobRouter = Router();
jobRouter.get("/", jobController.listJobs);
jobRouter.get("/:id", jobController.getJob);
jobRouter.post("/", jobController.insertJob);
jobRouter.put("/:id", jobController.updateJob);
jobRouter.delete("/:id", jobController.deleteJob);

export { jobRouter };
