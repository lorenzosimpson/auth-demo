import React, { Component } from "react";

import { Row, Col, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";

class Content extends Component {
  render() {
    return (
      <Container>
      <div className="next-steps my-5">
        <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
      </div>
      <div class="col-md-5">
        <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 500x500"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
      </div>
    </div>
        <h2 className="my-5 text-center">Why Hackathon Portal?</h2>
        <Row className="d-flex justify-content-between">
          {contentData.map((col, i) => (
            <Col key={i} md={5} className="mb-4">
              <h6 className="mb-3">
              <i className={`fas fa fa-${col.icon} mr-3`} style={{fontSize: '4em', display:'inline'}}></i>
                  {col.title}
              </h6>
              <p>{col.description}</p>
            </Col>
          ))}
          </Row>
      </div>
      </Container>
    );
  }
}

export default Content;
