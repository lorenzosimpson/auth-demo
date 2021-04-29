import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Container, Card, CardBody } from 'reactstrap';
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import history from '../history';
import { Link } from 'react-router-dom';


class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	return (
		<Container fluid={true} className="d-flex justify-content-center mt-5 mb-5" role="main">
		<Card className="shadow card col-sm-8 col-md-6 col-lg-4 col-xs-12">
			<CardBody>
			<div className="d-flex justify-content-center">
			<img src={logo} width="100px" height="100px" alt="Logo"></img>
			</div>
			<h4 className="text-center">Welcome</h4>
			<h1 className="text-center text-muted h6 mb-4">Sign up for Hackathon Portal</h1>
			<form className="form-horizontal">
				{/* signup */}
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
						type="submit">Sign Up</button>
						</Col>
					</Row>
				</div>
				<p className="text-center">Already have an account? <Link className="link" to='/login'>Log in</Link>
				</p>
			</form>
			</CardBody>
		</Card>
		</Container>
	)
}
}

export default Signup