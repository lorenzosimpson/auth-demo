import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Item, Segment } from 'semantic-ui-react';
import { Container } from 'reactstrap';
import SearchItem from './SearchItem';
import history from '../../history';
import { formatDateYear } from '../../utils/dateFormats'
import NoItems from '../Icon';
import { Redirect } from 'react-router';
import InnerLoader from '../load/InnerLoader';

function SearchPage(props) {
    const { searchText } = props.location.state
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)

    const navigateToHackathonView = (id, source) => {
        history.push(`/hackathons/${id}?source=${source}`)
    }

    useEffect(() => {
        axios.get('/hackathon/search', { params: { name: searchText } })
            .then(response => {
                console.log(response.data)
                setResults(response.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [searchText])


    return (
        <Container className="my-5">
            <Header as="h1" content="Search" subheader={`Results for '${searchText}'`}/>
          
            <Segment>
                <Item.Group>
                    {!results.length && !loading ? (
                        <NoItems />
                    ) : loading ? (
                        <InnerLoader />
                    )
                        : (<>{results.map(hackathon => (
                            <SearchItem
                                navigateToHackathonView={navigateToHackathonView}
                                formatDate={formatDateYear}
                                imgSrc={hackathon.image}
                                item={hackathon} />
                        ))}</>)
                    }
                </Item.Group>
            </Segment>

        </Container>
    );
}

export default SearchPage;