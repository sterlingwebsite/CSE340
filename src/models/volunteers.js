import db from "./db.js";

const addVolunteer = async (projectId, userId) => {
  const query = `
        INSERT INTO public.project_volunteers (project_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING project_id, user_id;
    `;

  const queryParams = [projectId, userId];
  const result = await db.query(query, queryParams);

  if (process.env.ENABLE_SQL_LOGGING === "true" && result.rows.length > 0) {
    console.log(`User ${userId} volunteered for project ${projectId}`);
  }

  return result.rows[0] || null;
};

const removeVolunteer = async (projectId, userId) => {
  const query = `
        DELETE FROM public.project_volunteers
        WHERE project_id = $1 AND user_id = $2
        RETURNING project_id, user_id;
    `;

  const queryParams = [projectId, userId];
  const result = await db.query(query, queryParams);

  if (process.env.ENABLE_SQL_LOGGING === "true" && result.rows.length > 0) {
    console.log(`User ${userId} was removed from project ${projectId}`);
  }

  return result.rows.length > 0;
};

const isUserVolunteering = async (projectId, userId) => {
  const query = `
        SELECT 1
        FROM public.project_volunteers
        WHERE project_id = $1 AND user_id = $2;
    `;

  const queryParams = [projectId, userId];
  const result = await db.query(query, queryParams);

  return result.rows.length > 0;
};

const getProjectsByVolunteer = async (userId) => {
  const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.name AS organization_name,
            pv.signup_date
        FROM public.project_volunteers pv
        JOIN public.service_projects p
        ON pv.project_id = p.project_id
        JOIN public.organizations o
        ON p.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY p.project_date ASC;
    `;

  const queryParams = [userId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

export {
  addVolunteer,
  removeVolunteer,
  getProjectsByVolunteer,
  isUserVolunteering,
};
