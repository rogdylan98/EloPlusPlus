import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {NavLink, Redirect, useHistory } from 'react-router-dom';
import SplashPage from "../SplashPage";
import './Navigation.css';

function ProfileButton({ user, prop }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(prop);
  const [loggedOut, setLoggedOut] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push(`/`);
  };

  return (
    <>
      <div>
        {/* <button className="log-out" onClick={openMenu}>Log Out</button> */}
        {/* <div className="back">
          <NavLink to="/questions">
              <button >Back</button>
          </NavLink>
        </div> */}
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
              <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
