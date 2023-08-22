import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { Navbar, Nav } from 'react-bootstrap';
import Scrollspy from 'react-scrollspy';
import { StaticImage } from 'gatsby-plugin-image';
import {
  FaGithub,
  FaFacebook,
  FaMedium,
  FaGooglePlay,
  FaGoodreads,
  FaStackOverflow,
  FaLinkedin,
  FaStrava,
} from 'react-icons/fa';

import './styles/header.scss';

const Header = ({ siteTitle }) => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/sjsakib', icon: FaGithub },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sjsakib',
      icon: FaLinkedin,
    },
    { name: 'Medium', url: 'https://medium.com/@sjsakib', icon: FaMedium },
    {
      name: 'StackOverflow',
      url: 'https://stackoverflow.com/users/5591795/s-j-sakib',
      icon: FaStackOverflow,
    },
    {
      name: 'Google Play',
      url: 'https://play.google.com/store/apps/dev?id=7003686930371901994',
      icon: FaGooglePlay,
    },
    {
      name: 'Goodreads',
      url: 'https://goodreads.com/sjsakib',
      icon: FaGoodreads,
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/sjsakib',
      icon: FaFacebook,
    },
    {
      name: 'Strava',
      url: 'https://www.strava.com/athletes/86864131',
      icon: FaStrava,
    },
  ];
  return (
    <Navbar id="side-nav" expand="lg">
      <Navbar.Brand as={Link} to="/#hero" title="Home">
        <span className="d-block d-lg-none">{siteTitle}</span>
        <div className="d-none d-lg-block">
          <StaticImage
            placeholder="traceSVG"
            src="../images/face-circle.png"
            className="brand-image"
          />
        </div>
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
          <Nav.Link as={Link} to="/projects/">
            Projects
          </Nav.Link>
          <Nav.Link as={Link} to="/blog/">
            Blog
          </Nav.Link>
        </Scrollspy>
        <div className="divider" />
        <div id="social-icons">
          {socialLinks.map(({ name, url, icon: Icon }) => (
            <a
              key={name}
              target="_blank"
              rel="noopener noreferrer"
              title={name}
              className="social-link"
              href={url}
            >
              <Icon className="social-icon" />
            </a>
          ))}
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
