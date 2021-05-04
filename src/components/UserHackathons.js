import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SessionContext } from '../contexts/SessionContext';
import { Container } from 'reactstrap';
import { Search, Grid, Column, Header } from 'semantic-ui-react';
import SearchComponent from './Search';


function UserHackathons(props) {
    const { user } = useContext(SessionContext);
    const [hackathons, setHackathons] = useState([])
    const [noResults, setNoResults] = useState(false)
    useEffect(() => {
        console.log('use effect called')
        axios.get(`/hackathon/u/${user.id}`)
        .then(res => {
            console.log('GET hackathon res', res)
            setHackathons(res.data)
            if (!res.data.length) setNoResults(true)
        })
        .catch(err => console.log('GET hacakthon error', err))
    }, [user])
    return (
        <Container className="mb-5">
            <Header as="h1">Events</Header>
            <SearchComponent source={hackathons} noResults={noResults} />
        </Container>
    );
}

export default UserHackathons;