import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { formatDateYear } from '../../utils/dateFormats';
import IconButton from '../button/IconButton'
import history from '../../history';
import { truncateText } from '../../utils/truncateText';

const navigateToHackathonView = (id, source) => {
    history.push(`/hackathons/${id}?source=${source}`)
  }

const ExploreCard = (props) => {
    const { header, date, description, image, id, participants } = props;
    
      
    return (
        <Card className="explore-card">
            <Image src={image} wrapped alt="" />
            <Card.Content>
                <Card.Header>{header}</Card.Header>
                <Card.Meta>
                    <span className='date'>{
                        formatDateYear(date)
                    }</span>
                </Card.Meta>
                <Card.Description>
                    {truncateText(description, 80)}
                </Card.Description>
              
            </Card.Content>
            <Card.Content extra>
                  <div className="d-flex justify-content-between align-items-center ">
                      <div>
                    <Icon name='user' />{participants}
                    </div>
                <IconButton icon="info circle" labelPosition='left' content="Details" 
                callback={() => navigateToHackathonView(id, window.location.pathname)} />
            </div>
            </Card.Content>
        </Card>)
}

export default ExploreCard