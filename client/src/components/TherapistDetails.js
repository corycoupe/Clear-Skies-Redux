import React from "react";
import {
  Card, CardText, CardBody,
   CardSubtitle, CardImg, Button
} from 'reactstrap';
const TherapistDetails = ({therapist}) => {
    return (
        <>
              <Card>
        <CardImg class="therapist-details__image" top width="100%" src={therapist.imagecard} alt="Card image cap" />
        <CardBody className="therapist-details__body">
          <CardSubtitle className="therapist-details__subtitle">Name </CardSubtitle>
          <CardText>{therapist.name}</CardText>
          <CardSubtitle className="therapist-details__subtitle">Profession </CardSubtitle>
          <CardText>{therapist.profession}</CardText>
          <CardSubtitle className="therapist-details__subtitle">City </CardSubtitle>
          <CardText>{therapist.address} {therapist.city}</CardText>
          <CardSubtitle className="therapist-details__subtitle">Postal Code </CardSubtitle>
          <CardText>{therapist.postal}</CardText>
          <CardSubtitle className="therapist-details__subtitle">Phone Number </CardSubtitle>
          <CardText>{therapist.telephone}</CardText>
          <CardSubtitle className="therapist-details__subtitle">Email </CardSubtitle>
          <CardText>{therapist.email}</CardText>
          <Button className="therapist-details__button" color="primary">CONTACT</Button>
        </CardBody>
      </Card>
        </>
    )
}

export default TherapistDetails;