import React, { useContext, useState } from 'react';
import { Container } from 'reactstrap';
import { Header } from 'semantic-ui-react';
import SearchComponent from './search/Search';
import InnerLoader from './load/InnerLoader';
import { UserContext } from '../contexts/UserContext';
import { useEffect } from 'react';
import useAuthentication from '../utils/useAuthentication';


function UserHackathons(props) {
    const { setUser } = useContext(UserContext)
    const [hackathons] = useState([])
    const [noResults, setNoResults] = useState(false)
    const [user] = useAuthentication()
    
    useEffect(() => {
        setUser(user)
    }, [user])
    
    if (!user.hasOwnProperty('id')) return <InnerLoader />
    return (
        <>
        <Container className="my-5">
            <Header as="h1"
            content="My Hackathons"
            subheader="Events you're participating in and organizing are listed here."
            />
            <SearchComponent source={hackathons}
                searchURL={`/hackathon/u/${user.id}`}
                noResults={noResults}
                setNoResults={setNoResults} />
        </Container>
        </>
    );
}

export default UserHackathons;