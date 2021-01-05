import React, { Fragment, useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //Destructuring
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <Form className='form' onSubmit={(e) => onSubmit(e)}>
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
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type='submit' value='Register'>
              Sign In
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
