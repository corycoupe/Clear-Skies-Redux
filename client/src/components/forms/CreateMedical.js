import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMedical } from '../../actions/medical';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

// formData is just using whatever inputs are in the forms
const CreateMedical = ({ createMedical, history }) => {
  const [formData, setFormData] = useState({
    location: '',
    about: '',
  });

  const { location, about } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createMedical(formData, history);
  };

  return (
    <Fragment>
      <Form className='form' onSubmit={(e) => onSubmit(e)}>
        <FormGroup>
          <Label for='exampleEmail' sm={2}>
            Location
          </Label>
          <Col sm={10}>
            <Input
              type='location'
              name='location'
              id='exampleLocation'
              value={location}
              onChange={(e) => onChange(e)}
              placeholder='Input your location'
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for='exampleText' sm={2}>
            About Yourself
          </Label>
          <Col sm={10}>
            <Input
              type='textarea'
              name='about'
              id='exampleText'
              value={about}
              onChange={(e) => onChange(e)}
              placeholder='About you'
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type='submit' value='Submit'>
              Submit
            </Button>{' '}
            <Link to='/dashboard'>
              <Button color='secondary'>Go Back</Button>
            </Link>
          </Col>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

CreateMedical.propTypes = {
  createMedical: PropTypes.func.isRequired,
};

// Wrapping the component in withRouter allows you to use the history props
export default connect(null, { createMedical })(withRouter(CreateMedical));
