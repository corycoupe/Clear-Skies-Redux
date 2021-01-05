import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPharma } from '../../actions/pharma';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const PharmaForm = ({ addPharma, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    type: '',
  });

  const { name, dosage, type } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addPharma(formData, history);
  };
  return (
    <Fragment>
      <Form className='form' onSubmit={(e) => onSubmit(e)}>
        <FormGroup>
          <Label for='exampleName' sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='name'
              id='exampleName'
              value={name}
              onChange={(e) => onChange(e)}
              placeholder='Type in the name of the proscription'
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for='exampleDosage' sm={2}>
            Dosage
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='dosage'
              id='exampleDosage'
              value={dosage}
              onChange={(e) => onChange(e)}
              placeholder='Type in how much you take per day'
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for='exampleType' sm={2}>
            Type
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='type'
              id='exampleType'
              value={type}
              onChange={(e) => onChange(e)}
              placeholder='Type in the type of medication'
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type='submit' value='Submit'>
              Submit
            </Button>{' '}
            <Link to='/pharma'>
              <Button color='secondary'>Go Back</Button>
            </Link>
          </Col>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

PharmaForm.propTypes = {
  addPharma: PropTypes.func.isRequired,
};

// Wrapping the component in withRouter allows you to use the history props
export default connect(null, { addPharma })(withRouter(PharmaForm));
