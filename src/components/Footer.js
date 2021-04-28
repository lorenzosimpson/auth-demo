import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import logo from '../assets/images/logo.png';

function Footer(props) {
    return (
        <footer className="footer d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center">
            <img src={logo} width="50"></img>
            <span>Created by Lorenzo Simpson</span>
            </div>
        </footer>
    );
}

export default Footer;