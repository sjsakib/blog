import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { Navbar, Nav } from 'react-bootstrap';
import Scrollspy from 'react-scrollspy';
import Img from 'gatsby-image';
import {
  FaGithub,
  FaFacebook,
  FaMedium,
  FaGooglePlay,
  FaGoodreads,
  FaStackOverflow,
} from 'react-icons/fa';

import './styles/header.scss';

const Header = ({ siteTitle, image }) => {
  return (
    <Navbar id="side-nav" expand="lg">
      <Navbar.Brand as={Link} to="/#hero">
        <span className="d-block d-lg-none">{siteTitle}</span>
        <span className="d-none d-lg-block">
          <Img fluid={image} className="brand-image" />
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Scrollspy
          items={['hero', 'about', 'skills', 'projects', 'blog']}
          currentClassName="active"
          componentTag={Nav}
          offset={-200}
        >
          <Nav.Link as={Link} to="/#hero">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/#about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/#skills">
            Skills
          </Nav.Link>
          <Nav.Link as={Link} to="/projects">
            Projects
          </Nav.Link>
          <Nav.Link as={Link} to="/blog">
            Blog
          </Nav.Link>
        </Scrollspy>
        <div className="divider" />
        <div id="social-icons">
          <a
            target="_blank"
            rel="noopener"
            title="Find me on GitHub"
            className="social-link"
            href="https://github.com/sjsakib"
          >
            <FaGithub className="social-icon" />
          </a>
          <a
            target="_blank"
            rel="noopener"
            title="Find me on Medium"
            className="social-link"
            href="https://medium.com/@sjsakib"
          >
            <FaMedium className="social-icon" />
          </a>
          <a
            target="_blank"
            rel="noopener"
            title="My apps on Google Play"
            className="social-link"
            href="https://play.google.com/store/apps/dev?id=7003686930371901994"
          >
            <FaGooglePlay className="social-icon" />
          </a>
          <a
            target="_blank"
            rel="noopener"
            title="Find me on Goodreads"
            className="social-link"
            href="https://goodreads.com/sjsakib"
          >
            <FaGoodreads className="social-icon" />
          </a>
          <a
            target="_blank"
            rel="noopener"
            title="Find me on StackOverflow"
            className="social-link"
            href="https://stackoverflow.com/users/5591795/s-j-sakib"
          >
            <FaStackOverflow className="social-icon" />
          </a>
          <a
            target="_blank"
            rel="noopener"
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
