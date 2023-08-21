/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Container } from 'react-bootstrap';

import Header from './header';
import './styles/layout.scss';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { title } = data.site.siteMetadata;
  return (
    <div className="root-container">
      <Header siteTitle={title} />
      <Container fluid>{children}</Container>
      <div className="divider" />
      <footer>
        <a href="https://github.com/sjsakib/blog">Fork it</a> <br />
        Powered by <a href="https://www.gatsbyjs.org/">Gatsby</a>
        <br />
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
