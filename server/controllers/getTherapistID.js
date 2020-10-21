const fs = require("fs");

const getTherapistID = (id) => {
  const allTherapistData = fs.readFileSync("./model/data.json");

  const filteredTherapistDetails = JSON.parse(allTherapistData).find(
    (therapist) => therapist.therapistId === id
  );

  return filteredTherapistDetails;
};

module.exports = getTherapistID;
