import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';
import InnerLoader from '../load/InnerLoader';
import ProjectCard from './ProjectCard';

const divideArrayIntoRows = (columns, arr) => {
    var R = [];
    for (var i = 0; i < arr.length; i += columns)
      R.push(arr.slice(i, i + columns));
    return R;
}

function ProjectView(props) {
    const [projects, setProjects] = useState([])
    const hackathon_id = props.hackathonId;
    const [loading, setLoading] = useState(false)
    const { user }= useContext(UserContext);
    const { alreadyParticipatingInAProject } = props;

    useEffect(() => {
        setLoading(true)
        axios.get(`/project/${hackathon_id}`)
        .then(response => {
            setProjects(response.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [])

    const dividedRows = divideArrayIntoRows(3, projects)

    if (loading) return <InnerLoader />
    if (!loading && !projects.length) return null
    
    return (
        <div className="mb-5">
            <Header as="h2">
                Projects
            </Header>

            <Segment>
                <Grid columns="three" stackable>
                    {dividedRows.map(row => (
                        <Grid.Row>
                        {row.map(project => {
                            const userHasJoined = project.participants.includes(user.id)
                            return (
                            <Grid.Column>
                              <ProjectCard
                                header={project.name}
                                description={project.description}
                                image={project.image}
                                extra={project.participants.length}
                                project_id={project._id}
                                userHasJoined={userHasJoined}
                                alreadyParticipatingInAProject={alreadyParticipatingInAProject}
                                />
                            </Grid.Column>
                            )
                        })}
                        </Grid.Row>
                    ))}
                </Grid>
            </Segment>
        </div>
    );
}

export default ProjectView;