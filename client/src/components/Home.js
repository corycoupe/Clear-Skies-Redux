import React from 'react';
import { Link } from "react-router-dom";
import {
  Card, CardText, CardBody,
   CardSubtitle, CardHeader
} from 'reactstrap';


const Home = ({medication, schedule, FormatDate}) => {
  if (medication === undefined || schedule === undefined)
   {
    return <p>loading medication or schedule list...</p>;
  }
    return (
        <>
        <section className="header__content">
        <div className="home__cards">
        <Card>
      <CardHeader className="text-center home__card-title bg-success">SCHEDULE</CardHeader>
      <Link to="/schedule">
        <CardBody className="home__card bg-primary">
          <CardSubtitle className="home__card-subtitle text-secondary">Professional</CardSubtitle>
          <CardText className="home__card-text text-secondary">{schedule[0].name}</CardText>
          <CardSubtitle className="home__card-subtitle text-secondary">Schedule</CardSubtitle>
          <CardText  className="home__card-text text-secondary">{FormatDate(schedule[0].date)}  </CardText>
        </CardBody>
        </Link>
      </Card>
      <CardHeader className="text-center home__card-title bg-success">MEDICATION</CardHeader>
      {medication.map((med) => (
      <Card className="home__card bg-primary">
              <Link to="/medication">
        <CardBody>
          <CardSubtitle className="home__card-subtitle text-secondary">Medication Name</CardSubtitle>
          <CardText  className="home__card-text text-secondary">{med.name}</CardText>
          <CardSubtitle className="home__card-subtitle text-secondary">Dosage</CardSubtitle>
          <CardText  className="home__card-text text-secondary">{med.dosage}</CardText>
          <CardSubtitle className="home__card-subtitle text-secondary">Type</CardSubtitle>
          <CardText  className="home__card-text text-secondary">{med.type}</CardText>
        </CardBody>
        </Link>
      </Card>
            ))} 
      </div>
    </section>
        
        </>
    )
}
export default Home;