import React from 'react'
import { Button, Header, Icon , Segment } from 'semantic-ui-react'
import history from '../history'

const NoItems = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='frown outline' />
      We don't have any hackathons matching your query
    </Header>
    <Segment.Inline>
    <Button 
            onClick={() => history.push('/explore')}
            color="teal">Browse Hackathons</Button>
      <Button 
            onClick={() => history.push('/create')}
            primary>Create a Hackathon</Button>
    </Segment.Inline>
  </Segment>
)

export default NoItems