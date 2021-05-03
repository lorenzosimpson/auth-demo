import React, { useEffect, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import axios from 'axios';


function HackathonView(props) {
  //  const { user } = useContext(SessionContext);
    const [hackathon, setHackathon] = useState({})
    const { id } = props.match.params;

    useEffect(() => {
        console.log('use effect called')
        axios.get(`/hackathon/${id}`)
        .then(res => {
            console.log('GET hackathon res', res)
            setHackathon(res.data)
        })
        .catch(err => console.log('GET hacakthon error', err))
    }, [])

    return (
        <div>
            {hackathon.name}
        </div>
    );
}

export default HackathonView;