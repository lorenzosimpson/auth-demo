import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from './components/Loader';
import useAuthentication from './utils/useAuthentication';

const PrivateRoute = ({component: Component, ...rest}) => {
const [user] = useAuthentication();

   if (!Object.values(user).length) {
       return <Loader />
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