import React, { useState, useEffect, Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, Col, Row, Container, Alert } from 'reactstrap';
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import history from '../history';


class LoginSignup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            error: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
    }

    handleLoginSubmit(event){
        event.preventDefault()
        console.log('login handleSubmit')
        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: this.props.returnTo
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error.response);
                this.setState({
                    error: error.response
                })
            })
}

     handleSignupSubmit(event) {
        console.log('sign-up handleSubmit, username: ')
        event.preventDefault()
        //request to server to add a new username/password
        axios.post('/user/', {
            username: this.state.username,
            password: this.state.password
        })
            .then((response) => {
                console.log(response)
                if (!response.data.error) {
                    console.log('successful signup afasdfdas')
                    axios
                    .post('/user/login', {
                        username: this.state.username,
                        password: this.state.password
                    })
                    .then(response => {
                        console.log('login response: ')
                        console.log(response)
                        if (response.status === 200) {
                            // update App.js state
                            this.props.updateUser({
                                loggedIn: true,
                                username: response.data.username
                            })
                            // update the state to redirect to home
                            this.setState({
                                redirectTo: this.props.returnTo
                            })
                        }
                    }).catch(error => {
                        console.log('login error: ')
                        console.log(error.response);
                        this.setState({
                            error: error.response
                        })
                    })
                    
                } else {
                    console.log('username already taken')
                }
            }).catch(error => {
                console.log('signup error: ')
                console.log(error.response)
                this.setState({
                    error: error.response
                })

            })
} 

    handleChange(event) {
            this.setState({
                [event.target.name]: event.target.value
            })
        }


    render() {
        const { data } = this.props;
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
    return (
        <div>
            {this.state.error && (
                 <Alert color="danger">
                 {this.state.error.status} {this.state.error.statusText}
               </Alert>
            )}
        <Container fluid={true} className="d-flex justify-content-center mt-5 mb-5" role="main">
        <Card className="shadow card col-sm-8 col-md-6 col-lg-4 col-xs-12">
            <CardBody>
            <div className="d-flex justify-content-center">
            <img src={logo} width="100px" height="100px" alt="Logo"></img>
            </div>
            <h4 className="text-center">Welcome</h4>
            <h1 className="text-center text-muted h6 mb-4">{this.props.data.h1}</h1>
            <form className="form-horizontal">
                {/* signup */}
                {/* login */}
                <div className="form-group">
                    <Row>
                    <div className="col">
                        <div className="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <FontAwesomeIcon icon="envelope" />
                            </span>
                         </div>
                        <input className="form-control"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    </div>
                    </Row>
                </div>
                <div className="form-group">
                    <Row>
                    <div className="col">
                    <div className="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <FontAwesomeIcon icon="lock" />
                            </span>
                         </div>
                        <input className="form-control"
                            placeholder="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={this.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    </div>
                    </Row>
                </div>
                <div className="form-group ">
                  <Row>
                      <Col>
                    <button
                        className="btn btn-primary col-mr-auto w-100"
                        onClick={data.destination === "/signup" ? this.handleLoginSubmit : this.handleSignupSubmit}
                        >{data.buttonText}</button>
                        </Col>
                    </Row>
                </div>
                <p className="text-center">Don't have an account? <Link className="link" to={data.destination}>{data.inverse}</Link>
                </p>
            </form>
            </CardBody>
        </Card>
        </Container>
        </div>
    );
        }
    }
}

export default LoginSignup;