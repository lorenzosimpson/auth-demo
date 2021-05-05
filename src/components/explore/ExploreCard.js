import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ExploreCard = (props) => {
    const { header, date, description, user, image } = props;
    const truncateText = (text, length) => {
        return text.length <= length ? text : text[length - 1] === ' ' ? text.substr(0, length -1) + '\u2026' : text.substr(0, length) + '\u2026'
      }
      
    return (
        <Card className="explore-card">
            <Image src={image} wrapped />
            <Card.Content>
                <Card.Header>{header}</Card.Header>
                <Card.Meta>
                    <span className='date'>{date}</span>
                </Card.Meta>
                <Card.Description>
                    {truncateText(description, 80)}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {user}
                </a>
            </Card.Content>
        </Card>)
}

export default ExploreCard