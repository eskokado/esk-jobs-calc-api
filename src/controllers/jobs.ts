import { Request, Response } from "express";
import {
  badRequest,
  internalServerError,
  validateNumber,
  notFound,
  ok,
} from "../services/util";
import { Job, jobModel } from "../models/jobs";

const insertJob = (req: Request, res: Response) => {
  {
    const job = req.body;
    if (!job) return badRequest(res, "Job inválido");

    if (!job.name) return badRequest(res, "Informe o nome do Job");
  }

  const job = req.body as Job;
  return jobModel
    .insertJob(job)
    .then((job) => {
      res.json(job);
    })
    .catch((err) => internalServerError(res, err));
};

const updateJob = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "id inválido");

    const job = req.body;
    if (!job) return badRequest(res, "Job inválido");

    if (!job.name) return badRequest(res, "Informe o nome do Job");

    const jobSaved = await jobModel.getJob(id);
    if (!jobSaved) return notFound(res);
  }

  const job = req.body as Job;
  return jobModel
    .updateJob(job)
    .then((job) => {
      res.json(job);
    })
    .catch((err) => internalServerError(res, err));
};

const listJobs = ({}: Request, res: Response) => {
  jobModel
    .listJobs()
    .then((jobs) => {
      res.json(jobs);
    })
    .catch((err) => internalServerError(res, err));
};

const getJob = ({ req }: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "id inválido");
  }

  return jobModel
    .getJob(id)
    .then((job) => {
      if (job) return res.json(job);
      else return notFound(res);
    })
    .catch((err) => internalServerError(res, err));
};

const deleteJob = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "id inválido");

    const jobSaved = await jobModel.getJob(id);
    if (!jobSaved) return notFound(res);
  }

  return jobModel
    .deleteJob(id)
    .then(() => ok(res))
    .catch((err) => internalServerError(res, err));
};

export const jobController = {
  insertJob,
  listJobs,
  getJob,
  deleteJob,
  updateJob,
};
