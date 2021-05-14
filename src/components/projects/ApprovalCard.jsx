import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

function ApprovalCard(props) {
    const { header, meta, description, image } = props;
    return (
        <Card>
            <Card.Content>
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
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
                     </Button>
                    <Button basic color='red'>
                        Decline
                     </Button>
                </div>
            </Card.Content>
        </Card>
    );
}

export default ApprovalCard;