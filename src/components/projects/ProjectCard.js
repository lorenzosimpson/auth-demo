import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import ProjectModal from './ProjectModal'

const ProjectCard = (props) => (
    <Card className="project-card">
        <Card.Content header={props.header} />
        <Card.Content description={props.description} />
        <Card.Content extra className="d-flex justify-content-between">
            <div className="pt-2">
                <Icon name='user' />{props.extra}
            </div>
            <ProjectModal name={props.header}
                description={props.description}
                image={props.image}
                project_id={props.project_id} 
                userHasJoined={props.userHasJoined}
                />
        </Card.Content>
    </Card>
)

export default ProjectCard