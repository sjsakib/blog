import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Jump from 'react-reveal/Jump';
import Fade from 'react-reveal/Fade';
import { FaLongArrowAltDown } from 'react-icons/fa';

import './styles/hero.scss';

const Hero = () => {
  return (
    <section id="hero">
      <Zoom cascade ssrReveal duration={500}>
        <h1>Hi!</h1>
      </Zoom>

      <Zoom cascade ssrReveal duration={500} delay={2000}>
        <h1>I'm Sakib</h1>
      </Zoom>

      <Fade cascade up ssrReveal duration={500} delay={4000}>
        <h3>A fronted developer</h3>
      </Fade>
      <Zoom ssrReveal delay={6000}>
        <a href="/#about" className="arrow-down-link">
          <Jump forever>
            <FaLongArrowAltDown className="arrow-down" />
          </Jump>
        </a>
      </Zoom>
    </section>
  );
};

export default Hero;
