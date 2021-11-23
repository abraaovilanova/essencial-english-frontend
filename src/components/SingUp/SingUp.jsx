import React, { useState } from 'react'
import axios from 'axios'
import './SingUp.css'

export default ()=>{
    const [name, setName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        console.log(email, password,name)
        const responser = await axios.post('http://localhost:3001/auth/register', {name, email, password})
        console.log(responser)
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
                <label for="femail">Email:</label><br />
                <input className="input-box" type="text" id="femail" name="femail" 
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