import React from 'react';
import { useContext } from 'react';
import { Divider, Item, Card, Label } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';
import IconButton from '../button/IconButton';

function SearchItem(props) {
    const { user } = useContext(UserContext);
    const { navigateToHackathonView, formatDate, imgSrc, item } = props;
    const isOrganizer = item.organizer_id === user.id
    const isParticipant = user.hackathons.includes(item._id) && !isOrganizer;
    
 

    return (
        <>
        { isOrganizer && (
            <Card.Content>
                <Label color='purple' ribbon >
                    Organizing
                </Label>
            </Card.Content>
        )} 

        { isParticipant && (
            <Card.Content>
            <Label color='blue' ribbon >
                Participating
            </Label>
        </Card.Content>
        )}

        <Item className="mb-5">
            <Item.Image width="50px" src={imgSrc} />
            <Item.Content>
                <Item.Header >{item.name}</Item.Header>
                <Item.Meta>
                    <span className="color">{formatDate(item.start_date)}-{formatDate(item.end_date)}</span>
                </Item.Meta>
                <Item.Description>
                    {item.description}
                </Item.Description>
            <div className="text-right mt-2">
                <IconButton icon="info circle" labelPosition='left' content="Details" 
                callback={() => navigateToHackathonView(item._id, window.location.pathname)} />
            </div>
            </Item.Content>
        </Item>
        <Divider />
        </>
    );
}

export default SearchItem;