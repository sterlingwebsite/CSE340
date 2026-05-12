import db from "./db.js";

const getAllProjects = async () => {
  const query = `
    SELECT 
        p.project_id, 
        p.title, 
        p.description, 
        p.location, 
        p.project_date, 
        o.name AS organization_name
    FROM 
        public.service_projects p
    JOIN 
        public.organizations o 
    ON 
        p.organization_id = o.organization_id
    ORDER BY 
        p.project_date ASC;
  `;

  const result = await db.query(query);

  return result.rows;
};

const getProjectsByOrganizationId = async (organizationID) => {
  const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM public.service_projects
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

  const queryParams = [organizationID];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.organization_id,
            o.name AS organization_name
        FROM public.service_projects p
        JOIN public.organizations o
            ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

  const result = await db.query(query, [number_of_projects]);

  return result.rows;
};

const getProjectDetails = async (projectID) => {
  const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.name AS organization_name,
            o.organization_id
        FROM public.service_projects p
        JOIN public.organizations o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
  const result = await db.query(query, [projectID]);

  return result.rows[0];
};

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
};
