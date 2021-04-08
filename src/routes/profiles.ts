import { Router } from "express";
import { profileController } from "../controllers/profiles";

const profileRouter = Router();
profileRouter.get("/", profileController.listProfiles);
profileRouter.get("/:id", profileController.getProfile);
profileRouter.post("/", profileController.insertProfile);
profileRouter.put("/:id", profileController.updateProfile);
profileRouter.delete("/:id", profileController.deleteProfile);

export { profileRouter };
