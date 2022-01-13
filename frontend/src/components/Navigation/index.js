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



  if (sessionUser) {
    sessionLinks = (
      <div className="profileButton">
        <ProfileButton user={sessionUser} />
        <NavLink exact to="/questions">Home</NavLink>
      </div>
    );
  } else {
    sessionLinks = (
      <>
      <div className='loginLinks'>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/questions">Demo Login</NavLink>
      </div>
      </>
    );
  }

  return (
    <div className ="navBar">
      <ul >
        <li className= "navList">
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
