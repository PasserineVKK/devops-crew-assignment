import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Flower2, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import GoogleLoginBtn from './GoogleLoginBtn';

const AppNavbar = ({ theme, toggleTheme }) => {
  return (
    <Navbar expand="lg" className="site-header" sticky="top">
      <Container className="navbar-container">
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
          <div className="brand-logo-icon">
            <Flower2 size={28} />
          </div>
          <div className="brand-text">
            <span className="brand-title">OrchidHaven</span>
          </div>
        </Navbar.Brand>

        <Navbar.Collapse id="main-navbar-nav" className="navbar-collapse-center">
          <Nav className="navbar-nav mx-auto">
            <Nav.Link as={NavLink} to="/" end className="nav-link">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/natural" className="nav-link">Natural</Nav.Link>
            <Nav.Link as={NavLink} to="/special" className="nav-link">Special</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="nav-link">Contact</Nav.Link>
            <Nav.Link as={NavLink} to="/admin" className="nav-link d-inline-flex align-items-center gap-1">
              <Settings size={14} />
              <span>Manage</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="navbar-actions d-flex align-items-center gap-2">
          <GoogleLoginBtn />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <Navbar.Toggle aria-controls="main-navbar-nav" className="navbar-toggler-custom" />
        </div>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
