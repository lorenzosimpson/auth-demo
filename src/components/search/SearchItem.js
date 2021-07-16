import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Divider, Item, Card, Label } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';
import IconButton from '../button/IconButton';

function SearchItem(props) {
    const { user } = useContext(UserContext);
    const { navigateToHackathonView, formatDate, imgSrc, item } = props;
    const [isOrganizer, setIsOrganizer] = useState(false)
    const [isParticipant, setIsParticipant] = useState(false)
    
    useEffect(() => {
        console.log(user)
        if (user.loggedIn) {
            setIsOrganizer(item.organizer_id === user.id)
            setIsParticipant(user.hackathons.includes(item._id) && !(item.organizer_id === user.id))
        }
    }, [user, item])

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
            <Item.Image width="50px" src={imgSrc} alt="Hackathon banner" />
            <Item.Content>
                <Item.Header >{item.name}</Item.Header>
                <Item.Meta>
                    <span className="form-text text-muted">{formatDate(item.start_date)}-{formatDate(item.end_date)}</span>
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