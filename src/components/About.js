import React from 'react';
import ExternalLink from './ExternalLink';
import Fade from 'react-reveal/Fade';

import './styles/about.scss';

const About = () => {
  return (
    <section id="about">
      <Fade up>
        <h1>About Me</h1>
      </Fade>
      <div className="about-body">
        <Fade up>
          <p>
            Ever since I was a kid, when computers were not very common in the
            country, I had a keen interest for those machines. I got my first
            computer at the age of seventeen and I've been coding since then.
            Besides languages, tools and technologies, I also tried to teach
            myself timeless core CS concepts and I always had the curiosity to
            understand how things work under the hood.
          </p>
        </Fade>
        <Fade up>
          <p>
            Currently I am working as a senior full-stack engineer at{' '}
            <ExternalLink href="https://cheqplease.com">CHEQ Inc.</ExternalLink>{' '}
            In fact, I was one of the first two members of the internal
            engineering team. I've worked on diverse parts of the tech stack,
            from the flutter based POS app to python based cloud printing
            service. My main focus is React based partner and customer facing
            web apps and Node based backend though. Here I've worked and
            interact with an international team of engineers, designers, product
            managers and other stakeholders. I believe it has improved my
            soft-skills a lot
          </p>
        </Fade>
        <Fade up>
          <p>
            I was part of an audiobook startup{' '}
            <ExternalLink href="https://shunboi.com/">ShunBoi</ExternalLink>{' '}
            where I built the initial MVP.
          </p>
        </Fade>
        <Fade up>
          <p>
            Another project I get complements on is{' '}
            <ExternalLink href="https://cfviz.netlify.app">CFViz</ExternalLink>,
            because apparently a lot of CS students use it and has around 1k
            stars on{' '}
            <ExternalLink href="https://github.com/sjsakib/cfviz">
              GitHub
            </ExternalLink>
            . But it's really a simple web app that fetches data with the{' '}
            <ExternalLink href="https://codeforces.com">
              Codeforces{' '}
            </ExternalLink>{' '}
            API and visualizes them with google charts.
          </p>
        </Fade>
        <Fade up>
          <p>
            Outside work, I'm into cycling and running. Most weekends you'd find
            me cycling through the lush green villages around Dhaka. And I'm
            currently preparing for my first half marathon.
          </p>
        </Fade>
      </div>
    </section>
  );
};

export default About;
