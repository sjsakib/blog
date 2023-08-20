import React, { useState, useEffect } from 'react';
import Zoom from 'react-reveal/Zoom';
import { FaLongArrowAltDown } from 'react-icons/fa';

import './styles/hero.scss';

const inRange = (x, a, b) => a <= x && x <= b;

const Hero = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const tt = setTimeout(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearTimeout(tt);
    };
  }, []);

  const iAm = [
    'A problem solver',
    'A self learner',
    'A passionate programmer',
    'A full stack developer',
  ];

  return (
    <section id="hero">
      <Zoom cascade ssrReveal duration={500}>
        <h1>Hi!</h1>
      </Zoom>

      <Zoom cascade ssrReveal duration={500} delay={2000}>
        <h1>I'm Sakib</h1>
      </Zoom>

      <div className="animation-loop">
        {iAm.map((x, i) => (
          <Zoom
            opposite
            key={x}
            duration={500}
            when={
              count > 2 &&
              inRange((count - 3) % (iAm.length * 3), i * 3, i * 3 + 1)
            }
            collapse
            ssrReveal
          >
            <h2>{x}</h2>
          </Zoom>
        ))}
      </div>

      <Zoom ssrReveal delay={(3 + iAm.length * 3) * 1000}>
        <a href="/#about" className="arrow-down-link" title="More">
          <FaLongArrowAltDown className="arrow-down" />
        </a>
      </Zoom>
    </section>
  );
};

export default Hero;
