import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import ExploreCard from './ExploreCard';

function ExploreCardContainer(props) {
    const { cards } = props;
    const cols = 3;

    const divideArrayIntoRows = (columns, arr) => {
            var R = [];
            for (var i = 0; i < arr.length; i += columns)
              R.push(arr.slice(i, i + columns));
            return R;
        }
    
    if (!cards.length) return <div></div>
    
    return (
        <div className="mt-5">
            <Header as="h2" content="Featured" />
            <Segment>
            <Grid columns="3" stackable> 
            {divideArrayIntoRows(cols, cards).map(row => (
                <Grid.Row className="m-0">
                    {row.map(hackathon => (
                        <Grid.Column>
                            <ExploreCard
                            header={hackathon.name}
                            description={hackathon.description}
                            date={hackathon.start_date}
                            user=""
                            id={hackathon._id}
                            image={hackathon.image}
                            participants={hackathon.participants}
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

export default ExploreCardContainer;