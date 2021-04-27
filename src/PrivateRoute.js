import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SessionContext } from './contexts/SessionContext';

const PrivateRoute = ({component: Component, ...rest}) => {
   const { user } = useContext(SessionContext);

   if (!Object.values(user).length) {
       return <div>Loading...</div>
   }

    return (
        <Route 
            {...rest}
            render={props => {
                if (user.username && user.loggedIn) {
                    return <Component {...props} />
                } else {
                    console.log('not authed, redirecting')
                    return <Redirect to="/login" />
                }
            }}
        />
    )
}

export default PrivateRoute;