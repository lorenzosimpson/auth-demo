import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SessionContext } from '../contexts/SessionContext';


function Profile(props) {
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
        <div>
            {hackathons.map((hackathon, id)=> (
                <p key={id}>{hackathon.name}</p>
            ))}
        </div>
    );
}

export default Profile;