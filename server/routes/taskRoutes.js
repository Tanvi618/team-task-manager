const express = require("express");
const router = express.Router();

const Task = require("../models/Tasks");

router.post("/create", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    res.json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
  console.log("TASK ERROR ", err);
  res.status(500).json({
    message: "Error creating task",
    error: err.message
  });
}
});

router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "title");

    res.json({
      message: "All tasks fetched",
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching tasks",
    });
  }
});

router.get("/overdue", async (req, res) => {
  try {
    const today = new Date();

    const tasks = await Task.find({
      status: { $ne: "done" },
      dueDate: { $lt: today },
    });

    res.json({
      message: "Overdue tasks",
      tasks,
    });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;