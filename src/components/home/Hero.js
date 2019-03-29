import React from "react"
import Zoom from "react-reveal/Zoom"

import "../styles/hero.scss"

const Hero = () => {
  return (
    <div id="hero">
      <h1>
        <Zoom cascade right className="animated-text">Hello!</Zoom>
        <Zoom cascade right delay={2000} className="animated-text">I'm Sakib</Zoom>
      </h1>
      <Zoom cascade right delay={4000}><h2>A fronted developer</h2></Zoom>
    </div>
  )
}

export default Hero
