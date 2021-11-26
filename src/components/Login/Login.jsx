import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate  } from 'react-router-dom'
import {
    Link
  } from "react-router-dom";
import './Login.css'
import { LoginAuthAction } from '../../redux/actions/authActions'

const Login = (props)=>{
    const { login } = props
    const history = useNavigate()
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        console.log(email, password)
        login({email, password}, history)
    }

    return (
        <div className="login-pag">
            <form action="">
                <label htmlFor="fname">Email:</label><br />
                <input className="input-box" type="text" id="fname" name="fname" 
                    value={ email } 
                    onChange={(e)=>setEmail(e.target.value)}
                />
                    <br />
                <label htmlFor="lname">Password:</label> <span style={{float:"right", marginRight:0}} >Forgot password?</span><br />
                <input className="input-box" type="password" id="lname" name="lname" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} /><br /><br />
                <input className="submit-btn" type="submit" value="Login" onClick={(e)=>handleSubmitLogin(e)} />
            </form> 
            Don’t have an account? <Link to='/signup'>Sign up</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        login: (loginState, history) => {
            dispatch(LoginAuthAction(loginState, history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)