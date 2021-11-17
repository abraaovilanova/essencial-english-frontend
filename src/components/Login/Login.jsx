import React, { useState } from 'react'
import './Login.css'

export default ()=>{
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <div className="login-pag">
            <form action="">
                <label for="fname">Email:</label><br />
                <input className="input-box" type="text" id="fname" name="fname" 
                    value={ email } 
                    onChange={(e)=>setEmail(e.target.value)}
                />
                    <br />
                <label for="lname">Password:</label> <span style={{float:"right", marginRight:0}} >Forgot password?</span><br />
                <input className="input-box" type="password" id="lname" name="lname" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} /><br /><br />
                <input className="submit-btn" type="submit" value="Login" onClick={(e)=>handleSubmitLogin(e)} />
            </form> 
            Don’t have an account? Sign up
        </div>
    )
}