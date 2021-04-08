import { Request, Response } from "express";
import {
  badRequest,
  internalServerError,
  validateNumber,
  notFound,
  ok,
} from "../services/util";
import { Profile, profileModel } from "../models/profiles";

const insertProfile = (req: Request, res: Response) => {
  const profile = req.body as Profile;
  if (!profile) return badRequest(res, "Profile inválido");

  if (!profile.name) return badRequest(res, "Informe o nome");

  return profileModel
    .insertProfile(profile)
    .then((profile) => {
      res.json(profile);
    })
    .catch((err) => internalServerError(res, err));
};

const updateProfile = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!validateNumber(id)) return badRequest(res, "id inválido");

  const profile = req.body as Profile;
  if (!profile) return badRequest(res, "Profile inválido");

  if (!profile.name) return badRequest(res, "Informe o nome");

  const profileSaved = await profileModel.getProfile(id);
  if (!profileSaved) return notFound(res);

  return profileModel
    .updateProfile(id, profile)
    .then((profile) => {
      res.json(profile);
    })
    .catch((err) => internalServerError(res, err));
};

const listProfiles = ({}: Request, res: Response) => {
  profileModel
    .listProfiles()
    .then((profiles) => {
      res.json(profiles);
    })
    .catch((err) => internalServerError(res, err));
};

const getProfile = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "id inválido");
  }

  return profileModel
    .getProfile(id)
    .then((profile) => {
      if (profile) return res.json(profile);
      else return notFound(res);
    })
    .catch((err) => internalServerError(res, err));
};

const deleteProfile = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!validateNumber(id)) return badRequest(res, "id inválido");

  const profileSaved = await profileModel.getProfile(id);
  if (!profileSaved) return notFound(res);

  return profileModel
    .deleteProfile(id)
    .then(() => ok(res))
    .catch((err) => internalServerError(res, err));
};

export const profileController = {
  insertProfile,
  listProfiles,
  getProfile,
  deleteProfile,
  updateProfile,
};
