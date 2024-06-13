const express = require("express");
const router = express.Router();
const { Tasks } = require("../controllers/tasks-controller");
const task = new Tasks();

router.get("/", async function (req, res, next) {
  res.json({ status: "success", data: await task.readTasks() });
});

router.post("/", async function (req, res, next) {
  const { body } = req;
  res.json({ status: "success", ...(await task.createTask(body)) });
});

router.patch("/:id", async function (req, res, next) {
  res.json({
    status: "success",
    ...(await task.updateTask(req.params.id, req.body)),
  });
});

router.delete("/:id", async function (req, res, next) {
  res.json({ status: "success", ...(await task.deleteTask(req.params.id)) });
});

module.exports = router;
