import React, { Fragment, useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Form className='form' onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label for='exampleName' sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              type='name'
              name='name'
              id='exampleName'
              value={name}
              onChange={(e) => onChange(e)}
              placeholder='Input your Name'
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='exampleEmail' sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Input
              type='email'
              name='email'
              id='exampleEmail'
              value={email}
              onChange={(e) => onChange(e)}
              placeholder='Input your Email'
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='examplePassword' sm={2}>
            Password
          </Label>
          <Col sm={10}>
            <Input
              type='password'
              name='password'
              id='examplePassword'
              value={password}
              onChange={(e) => onChange(e)}
              placeholder='Input your Password'
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='examplePassword2' sm={2}>
            Confirm Password
          </Label>
          <Col sm={10}>
            <Input
              type='password'
              name='password2'
              id='examplePassword2'
              value={password2}
              onChange={(e) => onChange(e)}
              placeholder='Input your Confirmation Password'
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type='submit' value='Register'>
              Register
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
