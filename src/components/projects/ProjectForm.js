import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Card, CardBody, Col } from 'reactstrap';
import { Header, Form, Button } from 'semantic-ui-react'
import history from '../../history';

function ProjectForm(props) {
    const { hackathon } = props.location.state
    const [formData, setFormData] = useState({})

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        formData.hackathon_id = hackathon._id
        axios.post('/project', formData)
        .then(res => {
            history.push(`/hackathons/${hackathon._id}`)
        })
        .catch(err => console.log('err'))
    }

    return (
        <Container className="mb-4 mt-5">
            <Header as="h1" content="New Project" subheader={hackathon.name}/>
            <Row className="justify-content-center">
                <Col>
                <Card className="w-100">
                    <CardBody>
                        <Form onChange={handleChange} onSubmit={handleSubmit}>
                            <Form.Field required>
                                <label htmlFor='name'>Name</label>
                                <input required placeholder='Name' name="name" id='name' />
                            </Form.Field>
                            <Form.Field required>
                                <label htmlFor='description'>Description</label>
                                <input required placeholder='Description' name="description" id='description' />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='image'>Image (optional)</label>
                                <input id='image' name='image' placeholder='Image URL' />
                            </Form.Field>
                            <small class='form-text text-muted mb-2'>Note: If you're not the hackathon organizer, your project will need to be approved.</small>
                            <div className='d-flex justify-content-end'>
                                <Button primary type='submit'>Submit</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProjectForm;