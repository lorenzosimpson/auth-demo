import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, Col, Row, Container, Alert } from 'reactstrap';
import logo from '../assets/images/logo.png';
import { Button, Form } from 'semantic-ui-react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const LoginSignup = (props) => {
    const { setUser } = useContext(UserContext);
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        redirectTo: null,
        error: ''
    })

   function handleLoginSubmit(event) {
        event.preventDefault()
        const body = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        console.log(body)
        axios
            .post('/user/login', body)
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    setUser({
                        loggedIn: true,
                        ...response.data
                    })
                    console.log(response.data, 'login data')
                    // update the state to redirect to home
                    setCredentials({
                        redirectTo: props.returnTo
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error.response);
                setCredentials({
                    error: error.response
                })
            })
    }

   function handleSignupSubmit(event) {
        event.preventDefault()
        const body = {
            username: event.target.username.value,
            password: event.target.password.value,
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
        }
        console.log(body)
        axios.post('/user/', body)
            .then((response) => {
                console.log(response)
                console.log('successful signup')
                if (response.status === 201) {
                    // update App.js state
                    setUser({
                        loggedIn: true,
                        username: response.data.username,
                        id: response.data.id
                    })
                    // update the state to redirect to home
                    setCredentials({
                        redirectTo: props.returnTo
                    })
                }
            }

            ).catch(error => {
                console.log('signup error: ')
                console.log(error.response)
                setCredentials({
                    error: error.response
                })
            })
    }


   function handleChange(event) {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }


        const { data } = props;
        const isLoginForm = data.destination === "/signup"
    

        if (credentials.redirectTo) {
            // if a user refreshes the login page before logging in, the pathname will be /login and they won't be reidrected after signup
            const dudRedirects = ['/login', '/signup']
            console.log(credentials.redirectTo)
            if (dudRedirects.includes(credentials.redirectTo)) return <Redirect to="/" />
            else return <Redirect to={{ pathname: credentials.redirectTo }} />
        } else {
            return (
                <div>
                    {credentials.error && (
                        <Alert color="danger">
                            {credentials.error.status} {credentials.error.statusText}
                        </Alert>
                    )}
                    <Container fluid={true} className="d-flex justify-content-center mt-5 mb-5" role="main">
                        <Card className="shadow card col col-sm-8 col-md-6 col-lg-4 ">
                            <CardBody>
                                <div className="d-flex justify-content-center">
                                    <img src={logo} width="100px" height="100px" alt="Logo"></img>
                                </div>
                                <h4 className="text-center">Welcome</h4>
                                <h1 className="text-center text-muted h6 mb-4">{props.data.h1}</h1>
                                <Form
                                    onSubmit={isLoginForm ? handleLoginSubmit : handleSignupSubmit}
                                >
                                    <div className="form-group">
                                        <Row>
                                            <div className="col">
                                                    <input className="form-control"
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        placeholder="Username"
                                                        required
                                                        value={credentials.username}
                                                        onChange={handleChange}
                                                    />
                                                    </div>
                                            </Row>
                                    </div>
                                    <div className="form-group">
                                        <Row>
                                            <div className="col">
                                            
                                                    <input className="form-control"
                                                        placeholder="Password"
                                                        type="password"
                                                        id="password"
                                                        required
                                                        name="password"
                                                        value={credentials.password}
                                                        onChange={handleChange}
                                                    />
                                              
                                            </div>
                                        </Row>
                                    </div>
                                   {data.destination !== '/signup' && ( 
                                       <>
                                   <div className="form-group">
                                        <Row>
                                            <div className="col">
                                          
                                                    <input className="form-control"
                                                        placeholder="First Name"
                                                        type="text"
                                                        id="first_name"
                                                        name="first_name"
                                                        required
                                                        value={credentials.first_name}
                                                        onChange={handleChange}
                                                    />
                                               
                                            </div>
                                        </Row>
                                    </div>
                                    <div className="form-group">
                                    <Row>
                                        <div className="col">
                                    
                                               
                                                <input className="form-control"
                                                    placeholder="Last Name"
                                                    type="text"
                                                    id="last_name"
                                                    name="last_name"
                                                    required
                                                    value={credentials.last_name}
                                                    onChange={handleChange}
                                                />
                                        
                                        </div>
                                    </Row>
                                </div>
                                </>
                                    )}
                                    <div className="form-group ">
                                        <Row>
                                            <Col>
                                                <Button
                                                    type="submit"
                                                    className="w-100" primary
                                                >{data.buttonText}</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <p className="text-center">Don't have an account? <Link className="link" to={data.destination}>{data.inverse}</Link>
                                    </p>
                                </Form>
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            );
        
    }
}

export default LoginSignup;