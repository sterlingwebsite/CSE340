import db from "./db.js";

const getAllCategories = async () => {
  const query = `
    SELECT 
      category_id,
      category_name
    FROM 
      public.categories
    ORDER BY 
      category_name ASC;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getCategoryById = async (categoryId) => {
  const query = `
    SELECT
      category_id,
      category_name
    FROM
      public.categories
    WHERE category_id = $1;
  `;

  const result = await db.query(query, [categoryId]);
  return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT
      c.category_id,
      c.category_name 
    FROM public.categories c
    JOIN public.project_categories pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.category_name ASC;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT
      p.project_id, 
      p.title,
      p.description,
      p.location,
      p.project_date
    FROM public.service_projects p
    JOIN public.project_categories pc
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date ASC;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
};

const createCategory = async (categoryName) => {
  const query = `
    INSERT INTO categories (category_name)
    VALUES ($1)
    RETURNING category_id;
  `;

  const queryParams = [categoryName];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to create category");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    console.log("Created new category with ID:", result.rows[0].category_id);
  }

  return result.rows[0].category_id;
};

const updateCategory = async (categoryId, categoryName) => {
  const query = `
    UPDATE categories
    SET category_name = $1
    WHERE category_id = $2
    RETURNING category_id;
  `;

  const queryParams = [categoryName, categoryId];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Category not found");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    console.log("Updated category with ID:", categoryId);
  }

  return result.rows[0].categoryId;
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  getProjectsByCategoryId,
  updateCategoryAssignments,
  createCategory,
  updateCategory,
};
