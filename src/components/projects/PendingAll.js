import React, { useState, useEffect} from 'react';
import { Container, Header, Segment, Icon } from 'semantic-ui-react';
import { Card, CardBody } from 'reactstrap';
import axios from 'axios';
import ApprovalCard from './ApprovalCard';

function PendingAll(props) {
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('/project/submissions/org')
        .then(res => {
            setIsLoading(false)
            setProjects(res.data)
        })
        .catch(err => setIsLoading(false))
    }, [])
    return (
        <Container className='my-5'>
            <Header as='h1' content='Pending Project Submissions' subheader="
            All pending projects for hackathons you're organizing
            "></Header>
            <Card>
                <CardBody>
                    <div className="d-flex flex-wrap">
                    { projects.map(project => (
                        <ApprovalCard header={project.name} 
                        description={project.description} 
                        image={project.image}
                        status={null}
                        pendingProjects={projects}
                        setPendingProjects={setProjects}
                        hackathonId={project.hackathon_id}
                        projectId={project._id} />
                    ))}
                    {(!isLoading && !projects.length ) && (
                        <Segment placeholder className="w-100">
                        <Header icon>
                          <Icon name='smile outline' />
                          No pending projects
                        </Header>
                        
                      </Segment>
                    )}
                    
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}

export default PendingAll;