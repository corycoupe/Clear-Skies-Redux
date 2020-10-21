const express = require("express");
const router = express.Router();

const getTherapistList = require("./../controllers/getTherapistList");
const getTherapistID = require("./../controllers/getTherapistID");
router.get("/", (req, res) => {
  res.json(getTherapistList());
});

// //get warehouse details.
router.get("/:therapistid", (req, res) => {
  res.json(getTherapistID(req.params.therapistid));
});

module.exports = router;
