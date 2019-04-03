import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { Card } from 'react-bootstrap';

import './styles/post-card.scss';

export default ({ title, summary, image, href }) => {
  return (
    <Link className="card-link" to={href}>
      <Card className="post-card">
        <Img class="card-img-top" fluid={image} alt="Card image cap" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{summary}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
