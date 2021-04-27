import React, {  useEffect, useState } from 'react';
import axios from 'axios'
import { Route, Switch } from 'react-router-dom';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import Navbar from './components/navbar';
import Home from './components/home';
import Profile from './components/Profile';
import "./App.css";
import { SessionContext } from './contexts/SessionContext';
import PrivateRoute from './PrivateRoute';
import initFontAwesome from './utils/initFontAwesome';

initFontAwesome();

const App = props => {
    const [user, setUser] = useState({})
    const [returnTo, setReturnTo] = useState(window.location.pathname)
    console.log(returnTo)

  useEffect(() => {
    getUser()
  }, [])

  function updateUser(userObject) {
    setUser(userObject)
  }

  function getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        setUser({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        setUser({
          loggedIn: false,
          username: null
        })
      }
    })
  }
    return (
      <SessionContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Navbar updateUser={updateUser} 
        loggedIn={user.loggedIn} 
        setReturnTo={setReturnTo} />
        {/* greet user if logged in: */}
        {user.loggedIn &&
          <p>Join the party, {user.username}!</p>
        }
        {/* Routes to different components */}
        <Switch>
        <Route
          exact path="/"
          component={Home} />
       <PrivateRoute
          path="/profile"
          component={Profile}
        />
        <Route
          path="/login"
          render={(props) =>
            <LoginForm
              {...props}
              updateUser={updateUser}
              returnTo={returnTo} 
              setReturnTo={setReturnTo}
            />}
        />
        <Route exact 
          path="/signup" 
          component={Signup} />
        </Switch>
      </div>
      </SessionContext.Provider>
    );
}

export default App;