const express = require("express");
const router = express.Router();

const Project = require("../models/project");

// CREATE PROJECT
router.post("/create", async (req, res) => {
  try {
    const { title, description, createdBy, teamMembers } = req.body;

    const project = new Project({
      title,
      description,
      createdBy,
      teamMembers,
    });

    await project.save();

    res.json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
      console.log(err);
    res.status(500).json({
      message: "Error creating project",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const projects = await Project.find();

    res.json({
      message: "All projects fetched",
      projects,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching projects",
    });
  }
});

module.exports = router;