import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const authLinks = (
    <Navbar color='faded' light className='bg-secondary'>
      <NavbarToggler onClick={toggleNavbar} className='mr-2' />
      <NavbarBrand
        onClick={logout}
        className='mr-auto text-primary header__account'
      >
        Sign Out
      </NavbarBrand>
      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <Link to='/dashboard'>
              <NavLink className='header__nav-text text-primary'>Home</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='/pharma'>
              <NavLink className='header__nav-text text-primary'>
                Medication
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='/therapist'>
              <NavLink className='header__nav-text text-primary'>
                Therapist
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='/schedule'>
              <NavLink className='header__nav-text text-primary'>
                Schedule
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );

  const guestLinks = (
    <Navbar color='faded' light className='bg-secondary'>
      <NavbarBrand
        href='/login'
        className='mr-auto text-primary header__account'
      >
        Sign In
      </NavbarBrand>
      <NavbarBrand
        href='/register'
        className='mr-auto text-primary header__account'
      >
        Register
      </NavbarBrand>
    </Navbar>
  );

  return (
    <section className='header'>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </section>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
