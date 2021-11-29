import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { url } from '../../api/api'
import './LikePage.css'
import { connect } from 'react-redux'
import parse from 'html-react-parser'

const LikePage = (param) =>{
    const { auth } = param
    const [favoriteSentences, setFavoriteSentences] = useState([])

    console.log(auth.user._id)

    const getFavoritesByUser = async () =>{
        const res = await axios.post(url + '/fav', {userId: auth.user._id})
        setFavoriteSentences(res.data)
    }

    useEffect(()=>{
        getFavoritesByUser()

    },[])

    return (
        <div className="likes-page">
            <h1 className="page-title">Your Likes!</h1>
            {favoriteSentences.map(sentence => {
                return (
                    <div>
                        <p>{parse(sentence.text)}</p>
                    </div>
                )
            })}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
  }
  

export default connect(mapStateToProps)(LikePage)