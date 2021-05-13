import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
// components
import Navbar from './components/navbar';
import Home from './components/home';
import UserHackathons from './components/UserHackathons';
import "./scss/App.scss";
import "./carousel.css";
import PrivateRoute from './PrivateRoute';
import Footer from './components/Footer';
import { loginData, signupData } from './utils/loginSignupFormData';
import LoginSignup from './components/login-signup';
import CreateHackathonForm from './components/CreateHackathonForm';
import Profile from './components/Profile';
import HackathonView from './components/HackathonView';
import AllHackathons from './components/explore/AllHackathons';
import useAuthentication from './utils/useAuthentication';
import { UserContext } from './contexts/UserContext';
import SearchPage from './components/search/SearchPage';
import ProjectForm from './components/projects/ProjectForm';



const App = props => {
    const [returnTo, setReturnTo] = useState(window.location.pathname)
    const [user, setUser] = useAuthentication()
    console.log(returnTo)

  function updateUser(userObject) {
    setUser(userObject)
  } 

    return (
      <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Navbar 
        setReturnTo={setReturnTo} />
        {/* Routes to different components */}
        <div className="main-content d-flex flex-column flex-grow-1" role="main">
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
              returnTo={returnTo} 
              setReturnTo={setReturnTo}

            />}
        />
        <PrivateRoute
          path='/project'
          component={ProjectForm} />
        <Route exact 
          path="/signup" 
          render={(props) => 
          <LoginSignup 
              {...props} 
              data={signupData}
              returnTo={returnTo}
              setReturnTo={setReturnTo}
                          />} />
        <Route exact path="/create"
        render={props => (
          <CreateHackathonForm {...props} />
        )} />

          <Route path="/hackathons/:id" component={HackathonView}/>
            
        <Route path="/explore" component={AllHackathons} />
        <Route path="/profile" render={props => <Profile {...props} loggedIn={user.loggedIn} /> } />
        <Route path="/search" component={SearchPage} />
        </Switch>
        </div>
        <Footer />
      </div>
      </UserContext.Provider>
    );
}

export default App;