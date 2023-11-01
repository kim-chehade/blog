import React, { useContext } from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav">
            <Nav.Link href="/?category=art">Art</Nav.Link>
            <Nav.Link href="/?category=science">Science</Nav.Link>
            <Nav.Link href="/?category=technology">Technology</Nav.Link>
            <Nav.Link href="/?category=cinema">Cinema</Nav.Link>
            <Nav.Link href="/?category=food">Food</Nav.Link>
            <Nav.Link href="/?category=others">Others</Nav.Link>
          
            <NavDropdown title="Account" id="basic-nav-dropdown">
              {currentUser ? (
                <>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <>
                  <Link to="/login">  {/* Use Link component for client-side navigation */}
                    <NavDropdown.Item>Login</NavDropdown.Item>
                  </Link>
                </>
              )}
              <Link to="/create">  {/* Use Link component for client-side navigation */}
                <NavDropdown.Item>Create a Blog</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
