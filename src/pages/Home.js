import React from "react";
import { ReactTyped } from "react-typed";

const Home = () => (
  <div className="main-center">
    <div className="intro">
      <div className="hello">Hello, my name is</div>
      <h1 className="glitch" data-text="Rachel Johnson">
        Rachel Johnson
      </h1>
      <div className="subtitle">
        <ReactTyped
          strings={[
            "I love learning new things",
            "I build futuristic web apps.",
            "I explore cyberpunk tech.",
            "I am, I am, I am.",
            "I am so clever that sometimes I don't understand a single word of what I am saying."

          ]}
          typeSpeed={50}
          backSpeed={30}
          backDelay={1200}
          loop
        />
      </div>
      <div className="desc">
        I’m a developer passionate about web technology, AI, and cyber security.<br />
        I enjoy learning new skills and implementing them in real life!
      </div>
      <a className="get-in-touch" href="mailto:rachie@example.com">Get In Touch</a>
    </div>
  </div>
);

export default Home;