import React, { useContext } from "react";

import logo from "../assets/images/logo.png";
import { SessionContext } from "../contexts/SessionContext";

const Hero = () => {
  const { user } = useContext(SessionContext);
  return (
  <div className="text-center hero my-5">
    {user.loggedIn &&
          <p>Welcome back, {user.username}!</p>
        }
    <h1 className="mb-4">Hackathon Portal</h1>
        <img className="mb-3 app-logo" src={logo} alt="React logo" width="200" />
    <p className="lead">
      The easiest way to organize, and participate in Hackathons.
    </p>
  </div>
)
  };

export default Hero;
