import { dbQuery, dbQueryFirst } from "../services/db";

export type Job = {
  id: number;
  name: string;
  daily_hours: number;
  total_hours: number;
  created_at: number;
};

const insertJob = async (job: Job) => {
  await dbQuery(
    `
    INSERT INTO jobs (
      name, 
      daily_hours, 
      total_hours, 
      created_at
    ) VALUES(?, ?, ?, ?)`,
    [job.name, job.daily_hours, job.total_hours, Date.now()]
  );
  let retorno = await dbQuery(
    `SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'jobs'`
  );
  return getJob(retorno[0].Id);
};

const updateJob = async (id: number, job: Job) => {
  await dbQuery(
    `
    UPDATE jobs SET 
      name = ?, 
      daily_hours = ?, 
      total_hours = ? 
      WHERE id = ?`,
    [job.name, job.daily_hours, job.total_hours, id]
  );
  return getJob(id);
};

const listJobs = async () => {
  const retorno = await dbQuery(`SELECT * FROM jobs`);
  return retorno as Job[];
};

const getJob = async (id: number) => {
  const retorno = await dbQueryFirst(`SELECT * FROM jobs WHERE id = ?`, [id]);
  return retorno as Job | undefined;
};

const deleteJob = async (id: number) => {
  await dbQueryFirst(`DELETE FROM jobs WHERE id = ?`, [id]);
};

export const jobModel = {
  insertJob,
  updateJob,
  listJobs,
  deleteJob,
  getJob,
};
