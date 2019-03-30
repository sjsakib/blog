import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Jump from 'react-reveal/Jump';
import { FaLongArrowAltDown } from 'react-icons/fa';

import '../styles/hero.scss';

const Hero = () => {
  return (
    <div id="hero">
      <h1>
        <Zoom cascade right ssrReveal className="animated-text">
          Hello!
        </Zoom>
        <Zoom cascade right ssrReveal delay={2000} className="animated-text">
          I'm Sakib
        </Zoom>
      </h1>
      <Zoom cascade right ssrReveal delay={4000}>
        <h2>A fronted developer</h2>
      </Zoom>
      <Zoom ssrReveal delay={6000}>
        <a href="/#blog">
          <Jump forever>
            <FaLongArrowAltDown class="arrow-down" />
          </Jump>
        </a>
      </Zoom>
    </div>
  );
};

export default Hero;
