const express = require("express");
const router = express.Router();

const getScheduleList = require("./../controllers/getScheduleList");

router.get("/", (req, res) => {
  res.json(getScheduleList());
});









module.exports = router;