import React from 'react'
import { Col, Row } from 'reactstrap'
import { Button, Header, Icon } from 'semantic-ui-react'
import history from '../history'

const NoItems = () => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='calendar outline' circular />
      <Header.Content>No Results</Header.Content>
    </Header>
    <div className="container my-5">
        <Row className="text-center">
        <Col xs="6">
        <Button 
            onClick={() => history.push('/')}
            color="teal">Browse Hackathons</Button>
        </Col>

        <Col xs="6">
        <Button 
            onClick={() => history.push('/create')}
            primary>Create a Hackathon</Button>
        </Col>
        </Row>
   
    </div>
  </div>
)

export default NoItems