import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Media, Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTherapists } from '../../actions/therapist';

const Therapist = ({ getTherapists, therapist: { therapists, loading } }) => {
  useEffect(() => {
    getTherapists();
  }, [getTherapists]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {therapists.map((therapists) => (
        <Media className='therapist'>
          <Media left className='therapist__media'>
            <Media
              object
              data-src='holder.js/64x64'
              src={therapists.image}
              className='therapist__media--image'
            />
          </Media>
          <Media body className='therapist__body'>
            <Media heading className='therapist__name'>
              {therapists.name}
            </Media>
            {therapists.profession}
            <Link to={`/therapist/${therapists._id}`}>
              <Button className='therapist__button' outline color='secondary'>
                Contact
              </Button>
            </Link>
          </Media>
        </Media>
      ))}
    </Fragment>
  );
};

Therapist.propTypes = {
  getTherapists: PropTypes.func.isRequired,
  therapist: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  therapist: state.therapist,
});

export default connect(mapStateToProps, { getTherapists })(Therapist);
