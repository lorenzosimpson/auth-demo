import React, { useContext } from "react";
import { Container } from 'reactstrap';
import {ReactComponent as Coworking } from "../assets/images/coworking.svg";
import { SessionContext } from "../contexts/SessionContext";

const Hero = () => {
  const { user } = useContext(SessionContext);
  return (
  <div className="next-steps-wrapper">
        <Container>
          <div className="next-steps pt-5 pb-5">
            <div class="row featurette">
              <div class="col-md-5 order-md-2">
                <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
                <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
              </div>
              <div class="col-md-7">
              <Coworking width="100%" height="100%"/>
              </div>
            </div>
          </div>
      </Container>
  </div>
)
  };

export default Hero;
