import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSchedule } from '../../actions/schedule';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const ScheduleForm = ({ addSchedule, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    from: '',
    to: '',
    zoomcall: '',
  });

  const { name, date, from, to, zoomcall } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addSchedule(formData, history);
  };
  return (
    <Fragment>
      <Form className='form' onSubmit={(e) => onSubmit(e)}>
        <FormGroup>
          <Label for='exampleEmail' sm={2}>
            Therapist Name
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='name'
              id='exampleTherapist'
              value={name}
              onChange={(e) => onChange(e)}
              placeholder="Type in Therapist's name"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for='exampleText' sm={2}>
            Date
          </Label>
          <Col sm={10}>
            <Input
              type='date'
              name='date'
              id='exampleDate'
              value={date}
              onChange={(e) => onChange(e)}
              placeholder='YYYY/MM/DD'
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for='exampleText' sm={2}>
            From
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='from'
              id='exampleTo'
              value={from}
              onChange={(e) => onChange(e)}
              placeholder='When appointment starts'
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for='exampleText' sm={2}>
            To
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='to'
              id='exampleTo'
              value={to}
              onChange={(e) => onChange(e)}
              placeholder='When appointment ends'
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for='exampleEmail' sm={2}>
            Zoom Call
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='zoomcall'
              id='exampleZoomcall'
              value={zoomcall}
              onChange={(e) => onChange(e)}
              placeholder='Zoom Call URL'
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type='submit' value='Submit'>
              Submit
            </Button>{' '}
            <Link to='/schedule'>
              <Button color='secondary'>Go Back</Button>
            </Link>
          </Col>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

ScheduleForm.propTypes = {
  addSchedule: PropTypes.func.isRequired,
};

// Wrapping the component in withRouter allows you to use the history props
export default connect(null, { addSchedule })(withRouter(ScheduleForm));
