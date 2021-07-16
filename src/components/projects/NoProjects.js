import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import history from '../../history'

const NoProjects = (props) => {
  const { hackathon } = props;
  return (
  <Segment placeholder>
    <Header icon>
      <Icon name='frown outline' />
      This hackathon has no projects.
    </Header>
    <Button primary 
    onClick={() => {
      history.push({
          pathname: '/project',
          state: {
              hackathon: hackathon
          }
      })
  }}
    
    >Create Project</Button>
  </Segment>
  )
}

export default NoProjects