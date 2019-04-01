import React from 'react';
import Fade from 'react-reveal/Fade';

import './styles/about.scss';

const About = () => {
  return (
    <section id="about">
      <Fade up>
        <h1>About Me</h1>
      </Fade>
      <Fade up>
        <p>
          I don't remember when and how I came to know about the kind of
          machines they call computers. As far as I can remember, I had been
          dreamig about workding with them. Every time I saw the movement of the
          mouse cursor, heard the sound of a &lsquo;click&rsquo;, something
          happened inside me. I got my first computer when I was seventeen.
        </p>
      </Fade>
      <Fade up>
        <p>
          I'm doing my graduation in Mathematics, but as you might have guessed,
          I'm eger to build a career in IT. If I've learned a single thing in
          all those years, that is how to learn things. I'm a fast learner and
          fast adopter. I can flexibly switch between technologies. My current
          focus is frontend development.
        </p>
      </Fade>
    </section>
  );
};

export default About;
