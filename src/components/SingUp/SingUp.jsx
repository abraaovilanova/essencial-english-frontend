import React, { useState } from 'react'
import './SingUp.css'

export default ()=>{
    const [name, setName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        console.log(email, password,name)
    }

    return (
        <div className="singup-pag">
            <form action="">
                <label for="fname">Name:</label><br />
                <input className="input-box" type="text" id="fname" name="fname" 
                    value={ name } 
                    onChange={(e)=>setName(e.target.value)}
                />
                    <br />
                <label for="fname">Email:</label><br />
                <input className="input-box" type="text" id="fname" name="fname" 
                    value={ email } 
                    onChange={(e)=>setEmail(e.target.value)}
                />
                    <br />
                <label for="lname">Password:</label><br />
                <input className="input-box" type="password" id="lname" name="lname" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} /><br /><br />
                <input className="submit-btn" type="submit" value="Sing up" onClick={(e)=>handleSubmitLogin(e)} />
            </form>
        </div>
    )
}