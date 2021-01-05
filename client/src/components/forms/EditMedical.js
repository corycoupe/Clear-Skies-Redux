import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMedical, getCurrentMedical } from '../../actions/medical';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
const initialState = {
  location: '',
  about: '',
};
// formData is just using whatever inputs are in the forms
const EditMedical = ({
  createMedical,
  getCurrentMedical,
  history,
  medical: { medical, loading },
}) => {
  const [formData, setFormData] = useState(initialState);

  const { location, about } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createMedical(formData, history);
  };
  useEffect(() => {
    if (!medical) getCurrentMedical();
    if (!loading && medical) {
      const medicalData = { ...initialState };
      for (const key in medical) {
        if (key in medicalData) medicalData[key] = medical[key];
      }
      setFormData(medicalData);
    }
  }, [loading, getCurrentMedical, medical]);

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

EditMedical.propTypes = {
  createMedical: PropTypes.func.isRequired,
  getCurrentMedical: PropTypes.func.isRequired,
  medical: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  medical: state.medical,
});
// Wrapping the component in withRouter allows you to use the history props
export default connect(mapStateToProps, { createMedical, getCurrentMedical })(
  EditMedical
);
