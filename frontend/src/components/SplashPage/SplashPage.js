// const { NavLink } = require("react-router-dom")
// const { signup } = require("../../store/session")

// import { NavLink } from "react-router-dom";
import './SplashPage.css';
const SplashPage = () => {
    return (
        <div className='splash'>
        <div className='welcome'>
            <h1> Welcome to Elo++</h1>
        </div>
            <div className='splashButtons'>
                <button className='login'>Log-In</button>
                <button className='register'>Create an Account</button>
                <button className='demo'>Demo User</button>
            </div>
        </div>
    )
}

export default SplashPage;
