import React from 'react';
import { Divider, Item } from 'semantic-ui-react';
import IconButton from '../button/IconButton';

function SearchItem(props) {
    const { navigateToHackathonView, formatDate, imgSrc, item } = props;
    return (
        <>
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