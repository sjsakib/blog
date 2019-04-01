import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaGithub, FaFacebook, FaMedium, FaGooglePlay } from 'react-icons/fa';

import './styles/header.scss';

const Header = ({ siteTitle }) => (
  <Navbar id="side-nav" bg="light" expand="lg">
    <Navbar.Brand href="#home">{siteTitle}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav variant="pills" as={'ul'} defaultActiveKey="#home">
        <Nav.Item>
          <Nav.Link href="/#home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/#about">About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/#skills">Skills</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/#projects">Projects</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/#blog">Blog</Nav.Link>
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

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
