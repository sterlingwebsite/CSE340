console.log(">>> Loaded organizations.js from:", import.meta.url);

import db from "./db.js";

const getAllOrganizations = async () => {
  const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
      FROM public.organizations;
    `;
  
  console.log(">>> QUERY BEING RUN:");
  console.log(query);

  const result = await db.query(query);

  return result.rows;
};

export { getAllOrganizations };
