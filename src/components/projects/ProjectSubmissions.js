import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { Header } from 'semantic-ui-react'
import ApprovalCard from './ApprovalCard';

function ProjectSubmissions(props) {
    const [approved, setApproved] = useState([])
    const [declined, setDeclined] = useState([])
    const [pending, setPending] = useState([])

    useEffect(() => {
        axios.get('/project/submissions/all')
        .then(res => {
            console.log(res.data)
            setApproved(res.data.filter(item => item.is_approved))
            setPending(res.data.filter(item => !item.is_approved && item.is_pending))
            setDeclined(res.data.filter(item => !item.is_approved && !item.is_pending))
        })
        .catch(err => console.log(err))
    }, [])

    const getStatus = project => {
        if (project.is_approved) {
            return {status: 'Approved', color: 'green'}
        } else if (!project.is_approved && project.is_pending) {
            return {status: 'Pending', color: 'gray'}
        } else {
            return { status: 'Declined', color: 'red'}
        }
    }


    return (
        <Container className='my-5'>
            <Header as='h1' content='My Project Submissions'></Header>
            <Card>
                <CardBody>
                    <Header as='h2' content="Pending Projects" />
                    { pending.map(project => (
                        <ApprovalCard header={project.name} 
                        description={project.description} 
                        image={project.image}
                        status={getStatus(project)}
                        projectId={project._id} />
                    ))}
                    <Header as='h2' content="Approved Projects" />
                    { approved.map(project => (
                        <ApprovalCard header={project.name} 
                        description={project.description} 
                        image={project.image}
                        status={getStatus(project)}
                        projectId={project._id} />
                    ))}
                    <Header as='h2' content="Declined Projects" />
                    { declined.map(project => (
                        <ApprovalCard header={project.name} 
                        description={project.description} 
                        image={project.image}
                        status={getStatus(project)}
                        projectId={project._id} />
                    ))}
                </CardBody>
            </Card>
        </Container>
    );
}

export default ProjectSubmissions;