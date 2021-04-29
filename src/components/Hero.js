import React from "react";
import { Container } from 'reactstrap';
import {ReactComponent as Coworking } from "../assets/images/coworking.svg";

const Hero = () => (
  <div className="next-steps-wrapper">
        <Container>
          <div className="next-steps pt-5 pb-5">
            <div class="row featurette">
              <div class="col-md-5 order-md-2">
                <h2 class="featurette-heading">Join a hackathon from <span class="text-muted">anywhere.</span></h2>
                <p class="lead">Hackathon Portal is the best way to organize or participate in hackathon events.</p>
              </div>
              <div class="col-md-7">
              <Coworking width="100%" height="100%"/>
              </div>
            </div>
          </div>
      </Container>
  </div>
);

export default Hero;
