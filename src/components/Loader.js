import React from 'react';
import Loader from "react-loader-spinner";
import { Container, Row, Col } from 'reactstrap';
export default class App extends React.Component {
    //other logic
    render() {
        return (
                <Row className="justify-content-center align-items-center flex-grow-1">
                    <Loader
                        type="ThreeDots"
                        color="#3D6DE6"
                        height={100}
                        width={100}
                    />
                </Row>
        );
    }
}