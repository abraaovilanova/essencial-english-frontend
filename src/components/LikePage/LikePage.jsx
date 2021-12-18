import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { url } from '../../api/api'
import './LikePage.css'
import { connect } from 'react-redux'
import parse from 'html-react-parser'
import { FaHeart, FaRegHeart, FaPlus } from "react-icons/fa"

const LikePage = (param) =>{
    const { auth } = param
    const [favoriteSentences, setFavoriteSentences] = useState([{text: '...', tag: ''}])
    const [random, setRandom] = useState(0)

    const getRandomArbitrary = ()=> {
        const min = 0
        const max = favoriteSentences.length - 1
        console.log(max)
        setRandom(Math.floor(Math.random() * (max - min) + min))
      }

    // console.log(auth.user._id)
    // console.log('aqui')

    const getFavoritesByUser = async () =>{
        const res = await axios.post(url + '/fav', {userId: auth.user._id})
        console.log(res.data.length? 'sim': 'não')
        setFavoriteSentences(res.data.length? res.data : [{text: "You don't have fav sentences yet", tag: ''}])
        console.log('aqui')
    }

    useEffect(()=>{
        getFavoritesByUser()
    },[])

    return (
    <div className="fav-page">
        <p style={{verticalAlign: "middle"}}>
            My <FaHeart style={{color:"#d175b7"}} /> sentences:
        </p>
        <div className="likes-page">
                <h3>{parse(favoriteSentences[random].text)}</h3>
                <p className="samll-txt-fav">{favoriteSentences[random].tag}</p>
        </div>
        <div className="btns">
            <button className="add-btn-fav" onClick={getRandomArbitrary}><FaPlus /> New sentence</button>
        </div>
    </div>
    )

}

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
  }
  

export default connect(mapStateToProps)(LikePage)