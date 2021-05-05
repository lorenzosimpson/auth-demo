import React from 'react';
import { Button, Divider, Item } from 'semantic-ui-react';

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

            <Button color="gray" onClick={() => navigateToHackathonView(item._id)}>Details</Button>
            </div>
            </Item.Content>
        </Item>
        <Divider />
        </>
    );
}

export default SearchItem;