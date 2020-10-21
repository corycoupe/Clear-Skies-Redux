const express = require("express");
const cors = require("cors");
const app = express(); //invoke express

const medicalRoute = require("./routes/medicalRoute");
const therapistRoute = require("./routes/therapistRoute");
const scheduleRoute = require("./routes/scheduleRoute");

// middleware here
app.use(express.json());
app.use(cors());

// //medical endpoint
app.use("/medical", medicalRoute);

// //therapist endpoint
app.use("/therapist", therapistRoute);

// schedule endpoint
app.use("/schedule", scheduleRoute);
// opening a listening to port 5000 for server
app.listen(5000, console.log("app is listening to port 5000"));
