const fs = require("fs");

const getTherapistList = () => {
  const therapistData = fs.readFileSync("./model/data.json");
  const therapistArr = JSON.parse(therapistData).map((data) => {
    return {
      therapistId: data.therapistId,
      name: data.name,
      image: data.image,
      telephone: data.telephone,
      city: data.city,
      address: data.address,
      postal: data.postal,
      email: data.email,
      profession: data.profession,
    };
  });
  return therapistArr;
};

module.exports = getTherapistList;