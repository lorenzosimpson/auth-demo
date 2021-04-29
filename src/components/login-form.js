import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, Col, Row, Container, NavLink } from 'reactstrap';
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillUnmount() {    
        this.props.setReturnTo('/');
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

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
                console.log(error);
                
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <Container className="d-flex justify-content-center mt-5 mb-5" role="main">
                <Card className="shadow">
                    <CardBody>
                    <div className="d-flex justify-content-center">
                    <img src={logo} width="100px" alt="Logo"></img>
                    </div>
                    <h4 className="text-center">Welcome</h4>
                    <h1 className="text-center text-muted h6 mb-4">Log in to Hackathon Portal</h1>
                    <form className="form-horizontal">
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
                                    value={this.state.password}
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
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                                </Col>
                            </Row>
                        </div>
                        <p className="text-center">Don't have an account? <Link className="link" to="/signup">Sign up</Link>
                        </p>
                    </form>
                    </CardBody>
                </Card>
                </Container>
            )
        }
    }
}

export default LoginForm