import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar as N,
  NavbarBrand,
  Nav,
  Container,
  Button,
} from 'react-bootstrap';
import { logout } from '../../redux/actions/authActions';

const { Collapse, Toggle } = N;
const { Link } = Nav;

export const Navbar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const logoStyles = {
    width: '100px',
  };

  return (
    <N className="bg-light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <NavbarBrand>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}
              alt="Logo"
              style={logoStyles}
            />
          </NavbarBrand>
        </LinkContainer>
        <Toggle aria-controls="basic-navbar-nav" />
        <Collapse className="justify-content-end">
          <Nav>
            {user && (
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            )}
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Link href="#">Login</Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Link>Register</Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </N>
  );
};
