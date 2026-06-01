import express from "express";

import { showHomePage } from "./controllers/index.js";
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showEditOrganizationForm,
  processEditOrganizationForm,
} from "./controllers/organizations.js";
import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation,
  showEditProjectForm,
  processEditProjectForm,
} from "./controllers/projects.js";
import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  categoryValidation,
  showEditCategoryForm,
  processEditCategoryForm,
} from "./controllers/categories.js";
import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  showDashboard,
  requireRole,
  showUsersPage,
} from "./controllers/users.js";
import {
  volunteerForProject,
  removeVolunteerFromProject,
} from "./controllers/volunteers.js";
import { testErrorPage } from "./controllers/errors.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", showProjectsPage);
router.get("/categories", showCategoriesPage);

// Volunteer tracking
router.post("/project/:id/volunteer", requireLogin, volunteerForProject);
router.post("/project/:id/removeVolunteer", requireLogin, removeVolunteerFromProject);


// Restricted route to users page
router.get("/users", requireRole("admin"), showUsersPage);

// Protected dashboard route
router.get("/dashboard", requireLogin, showDashboard);

// User login routes
router.get("/login", showLoginForm);
router.post("/login", processLoginForm);
router.get("/logout", processLogout);

// User registration routes
router.get("/register", showUserRegistrationForm);
router.post("/register", processUserRegistrationForm);

// Routes to create a new category
router.get("/new-category", requireRole("admin"), showNewCategoryForm);
router.post(
  "/new-category",
  requireRole("admin"),
  categoryValidation,
  processNewCategoryForm,
);

// Routes to edit a category
router.get("/edit-category/:id", requireRole("admin"), showEditCategoryForm);
router.post(
  "/edit-category/:id",
  requireRole("admin"),
  categoryValidation,
  processEditCategoryForm,
);

// Routes to handle the assign categories to project form
router.get(
  "/assign-categories/:projectId",
  requireRole("admin"),
  showAssignCategoriesForm,
);
router.post(
  "/assign-categories/:projectId",
  requireRole("admin"),
  processAssignCategoriesForm,
);

// Route to handle the edit project form submission
router.post(
  "/edit-project/:id",
  requireRole("admin"),
  projectValidation,
  processEditProjectForm,
);

// Route to display the edit project form
router.get("/edit-project/:id", requireRole("admin"), showEditProjectForm);

// Route for new project page
router.get("/new-project", requireRole("admin"), showNewProjectForm);

// Route to handle new project form submission
router.post(
  "/new-project",
  requireRole("admin"),
  projectValidation,
  processNewProjectForm,
);

// Route to handle the edit organization form submission
router.post(
  "/edit-organization/:id",
  requireRole("admin"),
  organizationValidation,
  processEditOrganizationForm,
);

// Route to handle new organization form submission
router.post(
  "/new-organization",
  requireRole("admin"),
  organizationValidation,
  processNewOrganizationForm,
);

// Route to display the edit organization form
router.get(
  "/edit-organization/:id",
  requireRole("admin"),
  showEditOrganizationForm,
);

// Route for new organization page
router.get("/new-organization", requireRole("admin"), showNewOrganizationForm);

// Route for category details page
router.get("/category/:id", showCategoryDetailsPage);

// Route for service project details page
router.get("/project/:id", showProjectDetailsPage);

// Route for organization details page
router.get("/organization/:id", showOrganizationDetailsPage);

// error-handling routes
router.get("/test-error", testErrorPage);

export default router;
