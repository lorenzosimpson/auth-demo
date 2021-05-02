import React, {  useEffect, useState } from 'react';
import axios from 'axios'
import { Route, Switch } from 'react-router-dom';
// components
import Navbar from './components/navbar';
import Home from './components/home';
import UserHackathons from './components/UserHackathons';
import "./scss/App.scss";
import "./carousel.css";
import { SessionContext } from './contexts/SessionContext';
import PrivateRoute from './PrivateRoute';
import Footer from './components/Footer';
import { loginData, signupData } from './utils/loginSignupFormData';
import LoginSignup from './components/login-signup';
import CreateHackathonForm from './components/CreateHackathonForm';
import Profile from './components/Profile';



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
  }
    return (
      <SessionContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Navbar updateUser={updateUser} 
        loggedIn={user.loggedIn} 
        setReturnTo={setReturnTo} />
        {/* Routes to different components */}
        <div className="main-content d-flex flex-column flex-grow-1">
        <Switch>
        <Route
          exact path="/"
          component={Home} />
       <PrivateRoute
          path="/my-hackathons"
          component={UserHackathons}
        />
        <Route
          path="/login"
          render={(props) =>
            <LoginSignup
              {...props}
              data={loginData}
              updateUser={updateUser}
              returnTo={returnTo} 
              setReturnTo={setReturnTo}

            />}
        />
        <Route exact 
          path="/signup" 
          render={(props) => 
          <LoginSignup 
              {...props} 
              data={signupData}
              updateUser={updateUser}
              returnTo={returnTo}
              setReturnTo={setReturnTo}
                          />} />
        <Route exact path="/create"
        render={props => (
          <CreateHackathonForm {...props} />
        )} />

        <Route path="/profile" render={props => <Profile {...props} /> } />
        </Switch>
        </div>
        <Footer />
      </div>
      </SessionContext.Provider>
    );
}

export default App;