const express = require("express");
const router = express.Router();

const getMedication = require("./../controllers/getMedication");

router.get("/", (req, res) => {
  res.json(getMedication());
});

// //get warehouse details.
// router.get("/:warehouseid", (req, res) => {
//   res.json(getWarehouseDetails(req.params.warehouseid));
// });

module.exports = router;
