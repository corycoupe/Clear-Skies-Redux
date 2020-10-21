const fs = require("fs");
const getTherapistList = require("./getTherapistList");

const getScheduleID = (id) => {
  const therapistList = getTherapistList();
  console.log(id);
  const filteredScheduleID = therapistList.filter((therapist) => therapist.therapistId === id);
  return filteredScheduleID;
};

module.exports = getScheduleID;