import React from 'react';
import { Item } from 'semantic-ui-react';

function SearchItem(props) {
    const { navigateToHackathonView, formatDate, imgSrc, item } = props;
    return (
        <Item className="mb-5" onClick={() => navigateToHackathonView(item._id)}>
            <Item.Image width="50px" src={imgSrc} />
            <Item.Content>
                <Item.Header >{item.name}</Item.Header>
                <Item.Meta>
                    <span className="color">{formatDate(item.start_date)}-{formatDate(item.end_date)}</span>
                </Item.Meta>
                <Item.Description>
                    {item.description}
                </Item.Description>

            </Item.Content>
        </Item>
    );
}

export default SearchItem;