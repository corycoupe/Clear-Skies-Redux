import React, { useState } from 'react';
import { Link} from "react-router-dom";
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

const Header = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

    return (
      <section className="header">
        <Navbar color="faded" light className="bg-secondary">
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand href="/home" className="mr-auto text-primary header__account">Signed In</NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
          <NavItem>
          <Link to="/home">
          <NavLink className="header__nav-text text-primary">Home</NavLink>
          </Link>
        </NavItem>
        <NavItem>
        <Link to="/medication">
          <NavLink className="header__nav-text text-primary">Medication</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/therapist"> 
          <NavLink className="header__nav-text text-primary">Therapist</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/schedule"> 
          <NavLink className="header__nav-text text-primary">Schedule</NavLink>
          </Link>
        </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </section>
  
      );
};

export default Header;
