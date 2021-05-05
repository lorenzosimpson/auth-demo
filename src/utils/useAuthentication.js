import React, { useState, useEffect } from 'react';

import axios from 'axios';

function useAuthentication() {
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get('/user/').then(response => {
            if (response.data.user) {
              console.log('Get User: There is a user saved in the server session: ', response.data)
              setUser({
                loggedIn: true,
                ...response.data.user
              })
            } else {
              console.log('Get user: no user');
              setUser({
                loggedIn: false,
                username: null
              })
            }
          })
    }, [])

    return [user, setUser]
}

export default useAuthentication;