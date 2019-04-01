import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Jump from 'react-reveal/Jump';
import Fade from 'react-reveal/Fade';
import { FaLongArrowAltDown } from 'react-icons/fa';

import './styles/hero.scss';

const Hero = () => {
  return (
    <section id="hero">
      <h1>
        <Zoom cascade ssrReveal duration={500} className="animated-text">
          Hello!
        </Zoom>
        <Zoom cascade ssrReveal duration={500} delay={2000} className="animated-text">
          I'm Sakib
        </Zoom>
      </h1>
      <Fade cascade up ssrReveal duration={500} delay={4000}>
        <h2>A fronted developer</h2>
      </Fade>
      <Zoom ssrReveal delay={6000}>
        <a href="/#about">
          <Jump forever>
            <FaLongArrowAltDown class="arrow-down" />
          </Jump>
        </a>
      </Zoom>
    </section>
  );
};

export default Hero;
