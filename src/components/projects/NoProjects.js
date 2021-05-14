import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

const NoProjects = (props) => (
  <Segment placeholder>
    <Header icon>
      <Icon name='frown outline' />
      This hackathon has no projects.
    </Header>
    <Button primary>Create Project</Button>
  </Segment>
)

export default NoProjects