import { getUpcomingProjects, getProjectDetails } from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

  // console.log("--- Verifying Projects Data ---");
  // console.table(projects);

  const title = "Upcoming Service Projects";
  res.render("projects", { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;

  const project = await getProjectDetails(projectId);

  res.render("project", { title: project.title, project });
};

export { showProjectsPage, showProjectDetailsPage };
