import React, { useState, useEffect, useContext } from 'react'
import { Card, Icon, Label, Header, Segment} from 'semantic-ui-react'
import { UserContext } from '../../contexts/UserContext';
import ProjectModal from './ProjectModal'

const ProjectCard = (props) => {
    const { alreadyParticipatingInAProject, project, isOrganizer, setProjects } = props;
    const [userHasJoined, setUserHasJoined] = useState(false)
    const { user } = useContext(UserContext)

    useEffect(() => {
        setUserHasJoined(project.participants.includes(user.id))
    }, [])
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
                userHasJoined={userHasJoined}
                setUserHasJoined={setUserHasJoined}
                setProjects={setProjects}
                alreadyParticipatingInAProject={alreadyParticipatingInAProject}
                isOrganizer={isOrganizer}
                />
        </Card.Content>
        
    </Card>
)
}

export default ProjectCard