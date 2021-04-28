import React, { Component } from "react";
import cowomen from '../assets/images/cowomen.jpg';
import { Row, Col, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";

class Content extends Component {
  render() {
    return (
      <>
        <div className="next-steps-wrapper">
          <Container>
            <div className="next-steps pt-5 pb-5">
              <div class="row featurette">
                <div class="col-md-5 order-md-2">
                  <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
                  <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                </div>
                <div class="col-md-7">
                <img src={cowomen} width="100%"></img>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div class="home-content-container">
          <Container className="pt-5">
            <h2 className="text-center">Why Hackathon Portal?</h2>
            <Row className="d-flex justify-content-between">
              {contentData.map((col, i) => (
                <Col key={i} md={5} className="mb-4">
                  <h6 className="mb-3">
                    <i className={`fas fa fa-${col.icon} mr-3`} style={{ fontSize: '4em', display: 'inline' }}></i>
                    {col.title}
                  </h6>
                  <p>{col.description}</p>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Content;
