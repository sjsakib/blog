import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Img from 'gatsby-image';
import { Card } from 'react-bootstrap';

import './styles/post-card.scss';

export default ({ title, summary, image, href }) => {
  const Link = href.startsWith('/') ? GatsbyLink : 'a';
  return (
    <Link className="card-link" to={href} href={href}>
      <Card className="post-card">
        {image && (
          <Img className="card-img-top" fluid={image} alt="Card image cap" />
        )}
        <Card.Body>
          <Card.Title as={'h4'}>{title}</Card.Title>
          <Card.Text>{summary}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
