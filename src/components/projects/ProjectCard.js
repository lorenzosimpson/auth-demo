import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import ProjectModal from './ProjectModal'


const CardExampleExtraContent = (props) => (
  <Card>
    <Card.Content header={props.header}/>
    <Card.Content description={props.description} />
    <Card.Content extra className="d-flex justify-content-between">
        <div>
      <Icon name='user' />{props.extra}
      </div>
      <ProjectModal name={props.header} description={props.description} image={props.image} />
    </Card.Content>
  </Card>
)

export default CardExampleExtraContent