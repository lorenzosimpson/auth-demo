import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile(props) {
    const [hackathons, setHackathons] = useState([])
    useEffect(() => {
        axios.get('/hackathon')
        .then(res => {
            console.log('GET hackathon res', res)
            setHackathons(res.data)
        })
        .catch(err => console.log('GET hacakthon error', err))
    }, [])
    return (
        <div>
            {hackathons.map(hackathon => (
                <p>{hackathon.name}</p>
            ))}
        </div>
    );
}

export default Profile;