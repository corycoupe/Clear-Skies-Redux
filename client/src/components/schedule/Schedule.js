import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSchedule, deleteSchedule } from '../../actions/schedule';
import Moment from 'react-moment';
import {
  Card,
  CardText,
  CardBody,
  CardSubtitle,
  Spinner,
  Button,
} from 'reactstrap';

const Schedule = ({
  getSchedule,
  schedule: { schedule },
  auth: { loading, user },
  deleteSchedule,
}) => {
  useEffect(() => {
    getSchedule(user._id);
  }, [getSchedule]);
  return loading && user === null ? (
    <Spinner color='success' />
  ) : (
    <Fragment>
      {schedule.map((schedule) => (
        <Card>
          <CardBody>
            <CardSubtitle className='schedule__card-title'>Name</CardSubtitle>
            <CardText>{schedule.name}</CardText>
            <CardSubtitle className='schedule__card-title'>Date</CardSubtitle>
            <CardText>
              <Moment format='YYYY/MM/DD'>{schedule.date}</Moment>
            </CardText>
            <CardSubtitle className='schedule__card-title'>From</CardSubtitle>
            <CardText>{schedule.from}</CardText>
            <CardSubtitle className='schedule__card-title'>To</CardSubtitle>
            <CardText>{schedule.to}</CardText>
            <CardSubtitle className='schedule__card-title'>
              Zoom Link
            </CardSubtitle>
            <CardText>{schedule.zoomcall}</CardText>
            <Button color='danger' onClick={() => deleteSchedule(schedule._id)}>
              Delete Schedule
            </Button>
          </CardBody>
        </Card>
      ))}
      {schedule.length === 0 && (
        <p>
          You do not have any scheduled appointments. Please add a schedule.
        </p>
      )}

      <Link to='/schedule-form'>
        <Button color='secondary' className='schedule__btn'>
          <Link to='/schedule-form'>Add Schedule</Link>
        </Button>
      </Link>
    </Fragment>
  );
};

Schedule.propTypes = {
  getSchedule: PropTypes.func.isRequired,
  schedule: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteSchedule: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  schedule: state.schedule,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSchedule, deleteSchedule })(
  Schedule
);
