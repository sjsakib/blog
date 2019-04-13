import React from 'react';
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
            I'm doing my graduation in Mathematics, but I'm eger to build a
            career in IT.
          </p>
        </Fade>
        <Fade up>
          <p>
            C was the first programming language I taught myself. Later I tried
            many different things: Processing (a variant of java), Python, PHP,
            JavaScript. And many related frameworks and technologies.
            I've taught myself some basic CS topics in the way as well.
            I've solved 350+ programming problems in various online judges. For
            the last one year, I'm focused on JavaScript. I've built a few apps
            using Node, Firebase, React and React Native.
          </p>
        </Fade>
        <Fade up>
          <p>
            Some of the other things that fascinate me are history, ethnology,
            languages, chess, books, movies etc.
          </p>
        </Fade>
      </div>
    </section>
  );
};

export default About;
