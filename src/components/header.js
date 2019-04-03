import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { Navbar, Nav } from 'react-bootstrap';
import { FaGithub, FaFacebook, FaMedium, FaGooglePlay } from 'react-icons/fa';

import './styles/header.scss';

const Header = ({ siteTitle }) => {
  let defaultActiveKey = '/#home';
  if (typeof window !== undefined) {
    const path = window.location.pathname;
    if (path.startsWith('/blog')) defaultActiveKey = '/#blog';
    if (path.startsWith('/project')) defaultActiveKey = '/#projects';
  }

  return (
    <Navbar id="side-nav" expand="lg">
      <Navbar.Brand as={Link} to="/#home">
        <span className="d-block d-lg-none">{siteTitle}</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav variant="pills" as={'ul'} defaultActiveKey={defaultActiveKey}>
          <Nav.Item>
            <Nav.Link as={Link} to="/#home" href="/#home">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/#about" href="/#about">
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/#skills" href="/#skills">
              Skills
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/#projects" href="/#projects">
              Projects
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/#blog" href="/#blog">
              Blog
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="divider" />
        <div id="social-icons">
          <a
            title="Find me on GitHub"
            className="social-link"
            href="https://github.com/sjsakib"
          >
            <FaGithub className="social-icon" />
          </a>
          <a
            title="Find me on Medium"
            className="social-link"
            href="https://medium.com/@sjsakib"
          >
            <FaMedium className="social-icon" />
          </a>
          <a
            title="My apps on Google Play"
            className="social-link"
            href="https://play.google.com/store/apps/dev?id=7003686930371901994"
          >
            <FaGooglePlay className="social-icon" />
          </a>
          <a
            title="Find me on Facebook"
            className="social-link"
            href="https://facebook.com/sjsakib"
          >
            <FaFacebook className="social-icon" />
          </a>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
