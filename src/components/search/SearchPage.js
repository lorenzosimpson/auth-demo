import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';
import {  Header, Item, Segment } from 'semantic-ui-react';
import { Container } from 'reactstrap';
import SearchItem from './SearchItem';
import history from '../../history';
import { formatDateYear } from '../../utils/dateFormats'
import NoItems from '../Icon';

function SearchPage(props) {
    const { searchText } = props.location.state
    const [results, setResults] = useState([])

    const navigateToHackathonView = (id, source) => {
        history.push(`/hackathons/${id}?source=${source}`)
      }

    useEffect(() => {
        axios.get('/hackathon/search', { params: { name: searchText } })
        .then(response => {
            console.log(response.data)
            setResults(response.data)
        })
        .catch(err => console.log(err))
    }, [searchText])
    console.log(searchText)
    // if (!searchText || !results.length) {
    //     return (
    //     <NoItems />
    //     )
    // }
    console.log(results)
    return (
        <Container className="my-5">
            <Header as="h1">
                Search
            </Header>
            <Segment>
                <Item.Group>


{   !results.length ? (

<NoItems />
)

           : (<>{results.map(hackathon => (
              <SearchItem 
              navigateToHackathonView={navigateToHackathonView} 
              formatDate={formatDateYear} 
              imgSrc={hackathon.image} 
              item={hackathon}  />
            ))}</>)
            }
                </Item.Group>
            </Segment>
           
        </Container>
    );
}

export default SearchPage;