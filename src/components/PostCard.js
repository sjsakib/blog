import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Img from 'gatsby-image';
import { Card } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Zoom from 'react-reveal/Zoom';

import './styles/post-card.scss';

export default ({ title, subtitle, image, href, dateString }) => {
  const internal = href.startsWith('/');
  const Link = internal ? GatsbyLink : 'a';
  const attrs = internal
    ? {}
    : { target: '_blank', rel: 'noopener noreferrer' };
  return (
    <Link className="card-link" title={title} to={href} href={href} {...attrs}>
      <Zoom>
        <Card className="post-card">
          {image && <Img className="card-img-top" fluid={image} />}
          <Card.Body>
            <Card.Title as={'h4'}>
              {title} {!internal && <FaExternalLinkAlt />}
            </Card.Title>
            <Card.Text>{subtitle}</Card.Text>
            {dateString && (
              <Card.Text>
                <small className="text-muted">{dateString}</small>
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      </Zoom>
    </Link>
  );
};
