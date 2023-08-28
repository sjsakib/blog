import React from 'react';
import Fade from 'react-reveal/Fade';

import './styles/skills.scss';
import { Link } from 'gatsby';

export default function Skills() {
  return (
    <section id="skills">
      <Fade up>
        <h1>Skills</h1>
      </Fade>
      <div>
        <Fade up>
          <p className="skill-group">
            <b>Languages</b> <br /> JavaScript, TypeScript, Python, Dart, SQL.
            Familliar: PHP, Java, C, C++, Golang <br />
          </p>
        </Fade>
        <Fade up>
          <p className="skill-group">
            <b>Frontend</b> <br /> Proficient: React, Next.js, React Native,
            React Query, GraphQL, Redux, Chrome Extensions, Flutter. Familliar:
            Vue.js, Alpine.js <br />
          </p>
        </Fade>
        <Fade up>
          <p className="skill-group">
            <b>Backend</b> <br /> Proficient: Node.js, Express.js, Nest.js.
            Familliar: Flask, Django <br />
          </p>
        </Fade>
        <Fade up>
          <p className="skill-group">
            <b>Database</b> <br /> MySQL, PostgresSQL, Redis. Familliar: MongoDB
            <br />
          </p>
        </Fade>
        <Fade up>
          <p className="skill-group">
            <b>Testing/Automation</b> <br /> Puppeteer, Selenium, Jest, Cypress,
            React Testing Library <br />
          </p>
        </Fade>
        <Fade up>
          <p className="skill-group">
            <b>Deployment</b> <br /> Docker, AWS (EC2, RDS, S3, Lambda), GitHub
            Actions <br />
          </p>
        </Fade>
        <Fade up>
          <p className="skill-group">
            <b>Others tools and technologies</b> <br /> Babel, Webpack, ESLint,
            SonarLint, Firebase, Sentry, Grafana, HTML, CSS, ES6+, Git, Linux,
            Jira, Figma, Tooljet
          </p>
        </Fade>
      </div>
      <Fade up>
        <p>
          <Link to="/how-i-work/">
            What I think makes me a good software engineer
          </Link>
        </p>
      </Fade>
    </section>
  );
}
