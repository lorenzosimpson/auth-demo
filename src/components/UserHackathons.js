import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SessionContext } from '../contexts/SessionContext';
import { Container } from 'reactstrap';
import { Search, Grid, Column } from 'semantic-ui-react';
import SearchExampleStandard from './Search';


function UserHackathons(props) {
    const { user } = useContext(SessionContext);
    const [hackathons, setHackathons] = useState([])
    useEffect(() => {
        console.log('use effect called')
        axios.get(`/hackathon/u/${user.id}`)
        .then(res => {
            console.log('GET hackathon res', res)
            setHackathons(res.data)
        })
        .catch(err => console.log('GET hacakthon error', err))
    }, [user])
    return (
        <Container>
            <h1>Events</h1>
            <SearchExampleStandard source={hackathons} />
            
        </Container>
    );
}

export default UserHackathons;