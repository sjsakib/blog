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
      file(relativePath: { regex: "/.*face-circle.png/" }) {
        childImageSharp {
          image: fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const { title } = data.site.siteMetadata;
  const { image } = data.file.childImageSharp;
  return (
    <div className="root-container">
      <Header siteTitle={title} image={image} />
      <Container fluid>{children}</Container>
      <div className="divider" />
      <footer>
        Powered by <a href="https://www.gatsbyjs.org/">Gatsby</a>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
