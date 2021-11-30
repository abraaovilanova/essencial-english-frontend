import React from 'react'
import { connect } from 'react-redux'
import './Navbar.css'
import { LogOutAuthAction } from '../../redux/actions/authActions'
import {
    Link,
    useNavigate
  } from "react-router-dom";
 
  import { FaHeart, FaRegHeart, FaPlus } from "react-icons/fa"
  import { AiFillHome, AiFillInfoCircle,AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
  import { IoLogOut } from 'react-icons/io5'

const Navbar = (props) => {
    const { auth, logout } = props
    const history = useNavigate()
    return (
        <ul>
            <li><Link to="/home"><AiFillHome /></Link></li>
            <li><Link to="/about"><AiFillInfoCircle /></Link></li>
            {auth.isLoggedIn?(
                <>
                    <li><Link to="/likes"><FaHeart /></Link></li>
                    <li style={{float:"right"}}><Link to="/" onClick={()=>{
                        logout(history)
                    }}><AiOutlineLogout /></Link></li>
                    {/* <li style={{float:"right"}}> <a><AiOutlineUser /> {auth.user.name}</a></li> */}
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