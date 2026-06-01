import {
  addVolunteer,
  removeVolunteer,
  isUserVolunteering,
} from "../models/volunteers.js";

const volunteerForProject = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.session.user?.user_id;

  try {
    const alreadyVolunteering = await isUserVolunteering(projectId, userId);

    if (alreadyVolunteering) {
      req.flash("info", "You are already volunteering for this project.");
      return res.redirect(`/project/${projectId}`);
    }

    await addVolunteer(projectId, userId);
    req.flash("success", "You are volunteering for this project!");
    res.redirect(`/project/${projectId}`);
  } catch (error) {
    console.error("Error volunteering for this project.", error);
    req.flash("error", "There was an error signing you up for this project.");
    res.redirect(`/project/${projectId}`);
  }
};

const removeVolunteerFromProject = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.session.user?.user_id;

  try {
    await removeVolunteer(projectId, userId);
    req.flash("success", "You are removed from volunteering for this project.");

    const referer = req.get("Referrer") || `/project/${projectId}`;
    res.redirect(referer);
  } catch (error) {
    console.error("Error removing volunteer:", error);
    req.flash("error", "Could not remove volunteer status.");
    res.redirect(`/project/${projectId}`);
  }
};

export { volunteerForProject, removeVolunteerFromProject };
