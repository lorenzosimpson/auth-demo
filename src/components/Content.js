import React, { Component } from "react";
import {ReactComponent as Coworking} from '../assets/images/coworking.svg';
import { Row, Col, Container } from "reactstrap";

import contentData from "../utils/contentData";

class Content extends Component {
  render() {
    return (
        <div class="home-content-container">
          <Container className="pt-5">
            <h2 className="text-center mb-5">Your destination for all things hackathon</h2>
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
    );
  }
}

export default Content;
