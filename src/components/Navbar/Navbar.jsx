import React from 'react'
import './Navbar.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default () => {
    return (
        <ul>
            <li><Link to="/home">Home</Link></li>
            {/* <li><Link to="/contact">Contact</Link></li> */}
            <li><Link to="/about">About</Link></li>
            <li style={{float:"right"}}><Link to="/login">Login</Link></li>
            <li style={{float:"right"}}><Link to="/singup">Sing up</Link></li>
            {/* <li style={{float:"right"}}><Link to="/about">Sing in</Link></li>
            <li style={{float:"right"}}><Link to="/about">Sing up</Link></li> */}
        </ul>
    )
}