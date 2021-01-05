import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardSubtitle,
  CardImg,
  Button,
  Spinner,
} from 'reactstrap';
import { connect } from 'react-redux';
import { getTherapist } from '../../actions/therapist';

const TherapistCard = ({
  getTherapist,
  match,
  therapist: { therapist, loading },
}) => {
  useEffect(() => {
    getTherapist(match.params.id);
  }, [getTherapist]);

  return loading || therapist === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Card>
        <CardImg
          className='therapist-details__image'
          top
          width='100%'
          src={therapist.imagecard}
          alt='Card image cap'
        />
        <CardBody className='therapist-details__body'>
          <CardSubtitle className='therapist-details__subtitle'>
            Name
          </CardSubtitle>
          <CardText>{therapist.name}</CardText>
          <CardSubtitle className='therapist-details__subtitle'>
            Profession
          </CardSubtitle>
          <CardText>{therapist.profession}</CardText>
          <CardSubtitle className='therapist-details__subtitle'>
            City
          </CardSubtitle>
          <CardText>
            {therapist.address} {therapist.city}
          </CardText>
          <CardSubtitle className='therapist-details__subtitle'>
            Postal Code
          </CardSubtitle>
          <CardText>{therapist.postal}</CardText>
          <CardSubtitle className='therapist-details__subtitle'>
            Phone Number
          </CardSubtitle>
          <CardText>{therapist.telephone}</CardText>
          <CardSubtitle className='therapist-details__subtitle'>
            Email
          </CardSubtitle>
          <CardText>{therapist.email}</CardText>
          <Button className='therapist-details__button' color='primary'>
            CONTACT
          </Button>
        </CardBody>
      </Card>
    </Fragment>
  );
};

TherapistCard.propTypes = {
  getTherapist: PropTypes.func.isRequired,
  therapist: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  therapist: state.therapist,
});
export default connect(mapStateToProps, { getTherapist })(TherapistCard);
