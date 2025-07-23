const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.put("/tasks/:id/complete", taskController.completeTask);

module.exports = router;
