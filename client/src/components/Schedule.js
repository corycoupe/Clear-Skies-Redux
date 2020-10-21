import React from 'react';
import {
    CardText, CardBody,
   CardSubtitle, Card
  } from 'reactstrap';
const Schedule = ({schedule, FormatDate, SortSchedule}) => {
    if (schedule === undefined) {
        return <p>loading schedule list...</p>;
      }
      return SortSchedule(schedule).map((schedule) => {
        return (
            <Card>
            <CardBody>
            <CardSubtitle className="schedule__card-title">Therapist</CardSubtitle>
            <CardText>{schedule.name}</CardText>
            <CardSubtitle className="schedule__card-title">Scheduled Time </CardSubtitle>
            <CardText>{FormatDate(schedule.date)}</CardText>
            <CardSubtitle className="schedule__card-title">Zoom Link</CardSubtitle>
            <CardText>{schedule.zoomCall}</CardText>
          </CardBody>
          </Card>
            )
      }
      )
}




export default Schedule;