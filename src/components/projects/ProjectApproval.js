import React, { useEffect, useState } from 'react';
import { Header, Segment, Container, Icon, Card } from 'semantic-ui-react';
import axios from 'axios'
import ApprovalCard from './ApprovalCard';

function ProjectApproval(props) {
    const { hackathon_id } = props.match.params;
    const [pendingProjects, setPendingProjects] = useState([])
    const [hackathonName, setHackathonName] = useState("")

    useEffect(() => {
        axios.get(`/project/pending/${hackathon_id}`)
        .then(response => {
            console.log(response)
            setPendingProjects(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`/hackathon/${hackathon_id}`)
        .then(res => {
            setHackathonName(res.data.name)
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <>
        <Container className='mb-5'>
        <Header as='h1' content={`${hackathonName}`}
         subheader='Pending Projects' />
             {(!pendingProjects.length) ? (
                 <Segment placeholder>
                 <Header icon>
                   <Icon name='checkmark box' />
                   No pending projects
                 </Header>
               </Segment>
            ) : (
                <Segment>
                <Card.Group itemsPerRow='3' doubling stackable>
               
                {pendingProjects.map(project => (
                     <ApprovalCard header={project.name} 
                     meta='' 
                     pendingProjects={pendingProjects}
                     projectId={project._id}
                     setPendingProjects={setPendingProjects}
                     description={project.description} 
                     image={project.image}/>
                ))}
                </Card.Group>
            </Segment>
            )}
    
        </Container>
        </>

    );
}

export default ProjectApproval;