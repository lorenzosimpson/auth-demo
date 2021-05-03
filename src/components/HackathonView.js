import React, { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';


function HackathonView(props) {
    const { user } = useContext(SessionContext);
    console.log(props)
    return (
        <div>
            {/* {hackathons.map((hackathon, id)=> (
                <p key={id}>{hackathon.name}</p>
            ))} */}
        </div>
    );
}

export default HackathonView;