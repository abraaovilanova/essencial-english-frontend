import React from 'react'
import './Footer.css'
import { FaHeart, FaRegHeart, FaPlus } from "react-icons/fa"

export default ()=>{
    return (
        <footer>
            <p>Feito com <FaHeart style={{color:'red'}} /> pela <b  style={{color:'rgb(255, 194, 102)'}}>MangueByte</b></p>
        </footer>
    )
}