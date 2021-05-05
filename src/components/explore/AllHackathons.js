import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SessionContext } from '../../contexts/SessionContext';
import { Container } from 'reactstrap';
import { Header, Segment } from 'semantic-ui-react';
import SearchComponent from '../Search';
import ExploreCardContainer from './ExploreCardContainer';
import _ from 'lodash';
import useAuthentication from '../../utils/useAuthentication';


function AllHackathons(props) {
    const [user] = useAuthentication();
    const [hackathons, setHackathons] = useState([])
    const [noResults, setNoResults] = useState(false)
    useEffect(() => {
        console.log('use effect called')
        axios.get(`/hackathon/explore`)
        .then(res => {
            console.log('GET hackathon res', res)
            setHackathons(res.data)
            if (!res.data.length) setNoResults(true)
        })
        .catch(err => console.log('GET hacakthon error', err))
    }, [])


    return (
        <>
           
        <Container className="my-5">
            <Header as="h1"
            content="Hackathon Events"
            subheader="Browse events here"
            />

            <ExploreCardContainer cards={hackathons} />
            
            <SearchComponent source={hackathons}
            searchURL="/hackathon"
             noResults={noResults} 
             setNoResults={setNoResults} />
        </Container>
        </>
    );
}

export default AllHackathons;