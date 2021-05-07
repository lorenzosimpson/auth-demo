import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
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
    
    return (
        <div className="mt-5">
            <Header as="h2" content="Featured" />
            <Grid columns="3" stackable> 
            {divideArrayIntoRows(cols, cards).map(row => (
                <Grid.Row>
                    {row.map(hackathon => (
                        <Grid.Column>
                            <ExploreCard
                            header={hackathon.name}
                            description={hackathon.description}
                            date={hackathon.start_date}
                            user=""
                            id={hackathon._id}
                            image={hackathon.image}
                             />
                        </Grid.Column>
                    ))}
                </Grid.Row>
            ))}
            

           
                
          

          
            {/* {cards.map(card => (

                 <ExploreCard />
                    ))} */}
            </Grid>
        </div>
    );
}

export default ExploreCardContainer;