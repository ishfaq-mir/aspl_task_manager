const express = require("express");
const router = express.Router();
const { Managers } = require("../controllers/managers-controller");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", async function (req, res, next) {
  const manager = new Managers();
  await manager.createManager();
  res.json({ status: "success" });
});

module.exports = router;
