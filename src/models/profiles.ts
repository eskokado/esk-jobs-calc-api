import { dbQuery, dbQueryFirst } from "../services/db";

export type Profile = {
  id: number;
  name: string;
  avatar: string;
  monthly_budget: number;
  days_per_week: number;
  hours_per_day: number;
  vacation_per_year: number;
  value_hour: number;
};

const insertProfile = async (profile: Profile) => {
  await dbQuery(
    `
    INSERT INTO profile (
      name, 
      avatar, 
      monthly_budget, 
      days_per_week, 
      hours_per_day, 
      vacation_per_year, 
      value_hour
    ) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    [
      profile.name,
      profile.avatar,
      profile.monthly_budget,
      profile.days_per_week,
      profile.hours_per_day,
      profile.vacation_per_year,
      profile.value_hour,
    ]
  );
  let retorno = await dbQuery(
    `SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'profile'`
  );
  return getProfile(retorno[0].Id);
};

const updateProfile = async (profile: Profile) => {
  await dbQuery(
    `
    UPDATE profile SET 
      name = ?, 
      avatar = ?, 
      monthly_budget = ?, 
      days_per_week = ?, 
      hours_per_day = ?, 
      vacation_per_year = ?, 
      value_hour = ? 
      WHERE id = ?`,
    [
      profile.name,
      profile.avatar,
      profile.monthly_budget,
      profile.days_per_week,
      profile.hours_per_day,
      profile.vacation_per_year,
      profile.value_hour,
      profile.id,
    ]
  );
  return getProfile(profile.id);
};

const listProfiles = async () => {
  const retorno = await dbQuery(`SELECT * FROM profile`);
  return retorno as Profile[];
};

const getProfile = async (id: number) => {
  const retorno = await dbQueryFirst(`SELECT * FROM profile WHERE id = ?`, [
    id,
  ]);
  return retorno as Profile | undefined;
};

const deleteProfile = async (id: number) => {
  await dbQueryFirst(`DELETE FROM profile WHERE id = ?`, [id]);
};

export const jobModel = {
  insertProfile,
  updateProfile,
  listProfiles,
  deleteProfile,
  getProfile,
};
