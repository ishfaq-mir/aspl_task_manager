const express = require("express");
const router = express.Router();
const { TeamMembers } = require("../controllers/team-members.controller");

const member = new TeamMembers();

router.get("/", async function (req, res, next) {
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

router.patch("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const { body } = req;
    res.json({ status: "success", ...(await member.updateMember(id, body)) });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    res.json({ status: "success", ...(await member.deleteMember(id)) });
  } catch (error) {
    res.send(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
