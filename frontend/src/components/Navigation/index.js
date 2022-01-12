import React, { useEffect }  from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  let sessionLinks;


  if (user === 1) {

  }
  if (sessionUser) {
    sessionLinks = (
      <div className="profileButton">
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <button onClick={() => setUser(1)}>Demo Login</button>
      </>
    );
  }

  return (
    <div className ="navBar">
      <ul >
        <li className= "navList">
          <NavLink exact to="/questions">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
