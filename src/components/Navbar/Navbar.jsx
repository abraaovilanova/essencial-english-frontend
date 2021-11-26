import React from 'react'
import { connect } from 'react-redux'
import './Navbar.css'
import { LogOutAuthAction } from '../../redux/actions/authActions'
import {
    Link,
    useNavigate
  } from "react-router-dom";
 

const Navbar = (props) => {
    const { auth, logout } = props
    const history = useNavigate()
    return (
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            {auth.isLoggedIn?(
                <>
                    <li><Link to="/login">Likes</Link></li>
                    <li style={{float:"right"}}><Link to="/" onClick={()=>{
                        logout(history)
                    }}>Logout</Link></li>
                    <li style={{float:"right"}}><a>{auth.user.name}</a></li>
                </>
            ):(
                <>
                <li style={{float:"right"}}><Link to="/login">Login</Link></li>
                <li style={{float:"right"}}><Link to="/signup">Sign up</Link></li>
                </>
            )}
        </ul>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout: (history) => {
            dispatch(LogOutAuthAction(history))
            
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)