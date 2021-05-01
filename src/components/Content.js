import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";

import contentData from "../utils/contentData";

class Content extends Component {
  render() {
    return (
        <div className="home-content-container">
          <Container className="pt-5">
            <h2 className="text-center mb-2 mt-5">Features</h2>
            <p className="text-center">Hackathon Portal makes it easier to get involved.</p>
            <Row className="d-flex justify-content-between mt-5">
              {contentData.map((col, i) => (
                <Col key={i} md={5} className="mb-4">
                  <div className="d-flex align-items-center mb-3  ">
                    <i className={`fas fa fa-${col.icon} mr-3`} style={{ fontSize: '2em', display: 'inline-block' }}></i>
                  <h3 className="mb-0">
                    {col.title}
                  </h3>
                  {col.supportingText && (
                    <p className="supporting-text mb-0">&nbsp;{col.supportingText}</p>
                  )}
                  </div>
                  <p>{col.description}</p>
               
                </Col>
              ))}
            </Row>
          </Container>
        </div>
    );
  }
}

export default Content;
