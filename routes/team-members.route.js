const express = require("express");
const router = express.Router();
const { TeamMembers } = require("../controllers/team-members.controller");
const { authMiddleWare } = require("../middlewares/auth-middleware");
const member = new TeamMembers();

router.get("/", authMiddleWare, async function (req, res, next) {
  try {
    const data = await member.readMembers();
    res.json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json({
      status: "success",
      ...(await member.createATeamMember(req.body)),
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.patch("/:id", authMiddleWare, async function (req, res, next) {
  try {
    const id = req.params.id;
    const { body } = req;
    res.json({ status: "success", ...(await member.updateMember(id, body)) });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.delete("/:id", authMiddleWare, async function (req, res, next) {
  try {
    const { id } = req.params;
    res.json({ status: "success", ...(await member.deleteMember(id)) });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/log-in", async function (req, res, next) {
  try {
    const { body } = req;
    console.log(body);

    res.json({
      status: "success",
      ...(await member.login(body.officeEmail, body.password)),
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
