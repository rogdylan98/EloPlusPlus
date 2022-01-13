// const { NavLink } = require("react-router-dom")
// const { signup } = require("../../store/session")

// import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import LoginFormPage from '../LoginFormPage';
import QuestionFeed from '../QuestionFeed';
import SignupFormPage from '../SignupFormPage';
import './SplashPage.css';

const SplashPage = () => {
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [demo, setDemo] = useState(false);
    const credential = 'demo@user.io';
    const password = 'password';
    useEffect(()=> {
        if (!demo) return;
        dispatch(sessionActions.login({credential, password}))
    }, [dispatch, demo]);

    return (
        <div className='splash'>
        <div className='welcome'>
            <h1> Welcome to Elo++</h1>
        </div>
            <div className='splashButtons'>
                <button onClick={() => setShowLogin(true)} className='login'>Log-In</button>
                <button onClick={() => setShowRegister(true)} className='register'>Create an Account</button>
                <button onClick={() => setDemo(true)}>Demo User</button>
            </div>
            {showLogin && <LoginFormPage />}
            {showRegister && <SignupFormPage/>}
            {demo && <Redirect to="/questions"/>}
        </div>
    )
}

export default SplashPage;
