import React from 'react'
import { Col, Row } from 'reactstrap'
import { Button, Header, Icon, Image } from 'semantic-ui-react'
import centeredParagraph from '../assets/images/centered-paragraph.png'
import history from '../history'

const HeaderExampleUsersIcon = () => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='calendar outline' circular />
      <Header.Content>You have no upcoming events</Header.Content>
    </Header>
    <div className="container mt-5">
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

export default HeaderExampleUsersIcon