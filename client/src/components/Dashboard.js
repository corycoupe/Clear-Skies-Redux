import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentMedical } from '../actions/medical';
import {
  Card,
  CardText,
  CardBody,
  CardSubtitle,
  CardHeader,
  Spinner,
  Button,
} from 'reactstrap';

const Dashboard = ({
  getCurrentMedical,
  deleteAccount,
  auth: { user },
  medical: { medical, loading },
}) => {
  useEffect(() => {
    getCurrentMedical();
  }, [getCurrentMedical]);

  return loading && medical === null ? (
    <Spinner color='success' />
  ) : (
    <Fragment>
      <Card className='home__dashboard'>
        <CardHeader className='text-center home__card-title bg-secondary'>
          Welcome {user.name}
        </CardHeader>
        {medical !== null ? (
          <Fragment>
            <CardBody className='home__card bg-light'>
              <CardSubtitle className='home__card-subtitle text-secondary'>
                Location
              </CardSubtitle>
              <CardText className='home__card-text text-secondary'>
                {medical.location}
              </CardText>
              <CardSubtitle className='home__card-subtitle text-secondary'>
                About
              </CardSubtitle>
              <CardText className='home__card-text text-secondary'>
                {medical.about}
              </CardText>
              <Link to='/edit-medical'>
                <Button color='secondary'>Edit Profile</Button>
              </Link>{' '}
              <Button color='danger' onClick={() => deleteAccount()}>
                Delete Account
              </Button>
            </CardBody>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet set up a user profile. Please add some info</p>
            <Link to='/create-medical'>
              <Button color='secondary'>
                <Link to='/create-medical'>Create Profile</Link>
              </Button>
            </Link>
          </Fragment>
        )}
      </Card>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentMedical: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  medical: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  medical: state.medical,
});

export default connect(mapStateToProps, { getCurrentMedical, deleteAccount })(
  Dashboard
);
