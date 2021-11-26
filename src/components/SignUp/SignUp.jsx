import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate  } from 'react-router-dom'
import './SignUp.css'
import { SignUpAuthAction } from '../../redux/actions/authActions'

const SignUp = (props)=>{
    const { user, singin } = props
    const history = useNavigate()
    const [name, setName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        singin({name, email, password}, history)
    }

    return (
        <div className="singup-pag">
            <form action="">
                <label htmlFor="fname">Name:</label><br />
                <input className="input-box" type="text" id="fname" name="fname" 
                    value={ name } 
                    onChange={(e)=>setName(e.target.value)}
                />
                    <br />
                <label htmlFor="femail">Email:</label><br />
                <input className="input-box" type="text" id="femail" name="femail" 
                    value={ email } 
                    onChange={(e)=>setEmail(e.target.value)}
                />
                    <br />
                <label htmlFor="lname">Password:</label><br />
                <input className="input-box" type="password" id="lname" name="lname" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} /><br /><br />
                <input className="submit-btn" type="submit" value="Sing up" onClick={(e)=>handleSubmitLogin(e)} />
            </form>
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
        singin: (userState, history) => {
            dispatch(SignUpAuthAction(userState, history))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)