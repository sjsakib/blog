import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import {
  FaNode,
  FaPython,
  FaEllipsisH,
  FaPaintRoller,
  FaReact,
} from 'react-icons/fa';

import './styles/skills.scss';
import AlgoLogo from '../images/AlgoLogo.svg';

export default () => {
  return (
    <section id="skills">
      <Fade up>
        <h1>Skills</h1>
      </Fade>
      <Row>
        <Col lg={6}>
          <Zoom>
            <div className="skill">
              <AlgoLogo className="skill-icon" />
              <h4>Algorithms and Data Structures</h4>
              <p>
                I have understanding of most commonly used algorightms and data
                structures. I've solved 350+ problems in varaius online judges.
              </p>
            </div>
          </Zoom>
        </Col>
        <Col lg={6}>
          <Zoom>
            <div className="skill">
              <FaPaintRoller className="skill-icon" />
              <h4>Design</h4>
              <p>
                I have the necessary skills in HTML and CSS to implement a
                design.
              </p>
            </div>
          </Zoom>
        </Col>
        <Col lg={6}>
          <Zoom>
            <div className="skill">
              <FaReact className="skill-icon" />
              <h4>React and React Native</h4>
              <p>
                I've been working with both these frameworks for over a year
                now. So far I've published two apps in Google Play.
              </p>
            </div>
          </Zoom>
        </Col>
        <Col lg={6}>
          <Zoom>
            <div className="skill">
              <FaNode className="skill-icon" />
              <h4>Node</h4>
              <p>
                I have basic skills in Node. I'm familliar with express,
                mongoose, passport, socket.io etc.
              </p>
            </div>
          </Zoom>
        </Col>
        <Col lg={6}>
          <Zoom>
            <div className="skill">
              <FaPython className="skill-icon" />
              <h4>Python</h4>
              <p>
                Python is my favorite programming languange. I prefer python for
                solving problems in online judges. I've worked with django,
                selenium, scrapy, fabric, beautiful soup, tkinter in the past.
                But didn't continue along that line.
              </p>
            </div>
          </Zoom>
        </Col>
        <Col lg={6}>
          <Zoom>
            <div className="skill">
              <FaEllipsisH className="skill-icon" />
              <h4>Others</h4>
              <p>
                Besides these, I have some basic DevOps skills I've deployed
                django and node projects in VPS. I'm used to git, linux
                shell, yarn npm etc.
              </p>
            </div>
          </Zoom>
        </Col>
      </Row>
    </section>
  );
};
