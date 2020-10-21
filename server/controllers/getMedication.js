const fs = require("fs");

const getMedication = () => {
  const medicationData = fs.readFileSync("./model/medical.json");
  const medicationArr = JSON.parse(medicationData).map((data) => {
    return {
      id: data.id,
      name: data.name,
      dosage: data.dosage,
      type: data.type,
    };
  });
  return medicationArr;
};

module.exports = getMedication;