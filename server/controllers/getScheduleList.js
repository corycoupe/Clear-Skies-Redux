const fs = require("fs");
// the controller to get the list of products
const getScheduleList = () => {
  const allScheduleData = fs.readFileSync("./model/data.json");
  let onlyScheduleList = [];

  const filteredScheduleData = JSON.parse(allScheduleData);
  
  for(let i = 0; i < filteredScheduleData.length; i++){
    // console.log(arrayOfObjs[i])
    for(let j = 0; j < filteredScheduleData[i].schedule.length; j++ ){
      console.log(filteredScheduleData[i].schedule[j]);
      onlyScheduleList.push(filteredScheduleData[i].schedule[j]);
    } 
  }
  
  console.log(onlyScheduleList);

return onlyScheduleList;
};
module.exports = getScheduleList;