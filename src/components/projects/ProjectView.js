import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
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
    useEffect(() => {
        axios.get(`/project/${hackathon_id}`)
        .then(response => {
            console.log(response.data)
            setProjects(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    const dividedRows = divideArrayIntoRows(3, projects)
    console.log(dividedRows)
    return (
        <div className="mb-5">
            <Header as="h2">
                Projects
            </Header>

            <Segment>
                <Grid columns="three" stackable>
                    {dividedRows.map(row => (
                        <Grid.Row>
                        {row.map(project => (
                            <Grid.Column>
                              <ProjectCard
                                header={project.name}
                                description={project.description}
                                image={project.image}
                                extra="24"
                                />
                            </Grid.Column>
                        ))}
                        </Grid.Row>
                    ))}
                </Grid>
            </Segment>

        </div>
    );
}

export default ProjectView;