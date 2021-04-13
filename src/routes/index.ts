import { Application } from "express";
import Router from "express";
import { profileRouter } from "./profiles";
import { jobRouter } from "./jobs";

export const useRoutes = (app: Application) => {
  const apiRouter = Router();

  //add your routes
  apiRouter.use("/jobs", jobRouter);
  apiRouter.use("/profiles", profileRouter);

  app.use("/api", apiRouter);
};
