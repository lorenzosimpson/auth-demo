import React, { Fragment } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";

const Home = () => (
  <div role="main">
    <h1 className="sr-only">Hackathon Portal Home</h1>
    <Hero />
    <Content />
  </div>
);

export default Home;
