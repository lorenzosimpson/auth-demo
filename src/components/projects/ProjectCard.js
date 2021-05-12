import React from 'react'
import { Card, Icon, Label, Header, Segment} from 'semantic-ui-react'
import ProjectModal from './ProjectModal'

const ProjectCard = (props) => {
    const { alreadyParticipatingInAProject, userHasJoined } = props;
return (
    <Card className="project-card">
        { userHasJoined && (
            <Card.Content>
            <Label color='green' ribbon >
          Participating
        </Label>
        </Card.Content>
        )}
        
        <Card.Content>
        <Header>{props.header}</Header>
        </Card.Content>
        
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
                alreadyParticipatingInAProject={alreadyParticipatingInAProject}
                />
        </Card.Content>
        
    </Card>
)
}

export default ProjectCard