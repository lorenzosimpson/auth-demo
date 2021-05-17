import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { Header } from 'semantic-ui-react'
import ApprovalCard from './ApprovalCard';

function ProjectSubmissions(props) {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios.get('/project/submissions/all')
        .then(res => {
            console.log(res.data)
            setProjects(res.data)
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <Container className='my-5'>
            <Header as='h1' content='My Project Submissions'></Header>
            <Card>
                <CardBody>
                    { projects.map(project => (
                        <ApprovalCard header={project.name} 
                        description={project.description} 
                        image={project.image}
                         projectId={project._id} />
                    ))}
                </CardBody>
            </Card>
        </Container>
    );
}

export default ProjectSubmissions;