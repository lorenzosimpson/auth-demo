import axios from 'axios';
import React from 'react';
import { Card, Button, Image, Label } from 'semantic-ui-react';

function ApprovalCard(props) {
    const { header, meta, description, image, projectId, pendingProjects, setPendingProjects, status } = props;
    
    const handleApprove = () => {
        axios.post(`/project/approve/${projectId}`, {})
        .then(res => {
            console.log(res)
            setPendingProjects(pendingProjects.filter(p => p._id !== projectId))
        })
        .catch(err => console.log(err))
    }

    const handleDecline = () => {
        axios.put(`/project/${projectId}`, {
            is_approved: false,
            is_pending: false
        })
        .then(res => {
            setPendingProjects(pendingProjects.filter(p => p._id !== projectId))
        })
        .catch(err => console.log(err))
    }

    return (
        <Card>
            <Card.Content>
                {(status) && (
                     <Card.Content className='mb-2'>
                     <Label ribbon color={status.color} >
                         {status.status}
                     </Label>
                 </Card.Content>
                )}
                <Image
                    floated='right'
                    size='tiny'
                    src={image}
                />
                <Card.Header>{header}</Card.Header>
                <Card.Meta>{meta}</Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
           {pendingProjects && ( <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green' onClick={() => handleApprove()}>
                        Approve
                     </Button>
                    <Button basic color='red' onClick={() => handleDecline()}>
                        Decline
                     </Button>
                </div>
            </Card.Content>)}
        </Card>
    );
}

export default ApprovalCard;