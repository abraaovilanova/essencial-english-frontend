import React, { useState, useEffect} from 'react'
import axios from 'axios'
import parse from 'html-react-parser'
import { connect } from 'react-redux'
import './Home.css'
import { SignUpAuthAction } from '../../redux/actions/authActions'

import { FaHeart, FaRegHeart, FaPlus } from "react-icons/fa"


const Home = (props)=>{

  
  const base_url_prod = 'https://essential-english-api.herokuapp.com'
  const base_url_dev = 'http://localhost:3001'
  const base_url = base_url_prod

  const { auth } = props
  const [sentences, setSentences] = useState('')
  const [sentence, setSentence] = useState('')
  const [tags, setTags] = useState('')
  const [active, setActive] = useState()
  const [like, setLike] = useState(false)



  useEffect(()=>{
    axios.get(base_url +'/sentence/tags').then(res => {
      setTags(res.data.tags)
    })

  },[])

  const getSentence = () => {
    const max = sentences.length
    const num = Math.floor((Math.random()*max+1))
    const selectedSentence = sentences.length ? sentences[num-1] : {text:'Welcome to my english app! Please, select a tag'}

    if(selectedSentence.favoriteUserId?.includes(auth.user._id)){
      setLike(true)
    }else{
      setLike(false)
    }

    setSentence(selectedSentence)
  }
  
  const getSentenceByTag = async (tag) => {
    const res = await axios.get(base_url + '/sentence/sentences/' + tag)
    setSentences(res.data.sentences)
  }

  


  const handleLikeBtn = async () =>{
    const userId = auth.user._id
    const res = await axios.post('http://localhost:3001/fav/'+ sentence._id, { favoriteUserId: userId})
    const indexOfSentence = sentences.indexOf(sentence)
    const newArray = [...sentences]

    newArray[indexOfSentence].favoriteUserId =[...newArray[indexOfSentence].favoriteUserId, userId]
    newArray[indexOfSentence].favoriteCount =  newArray[indexOfSentence].favoriteCount + 1
    setSentences(newArray)
    setLike(!like)
  }

  useEffect(()=>{
    getSentence()

  },[sentences.length])


    return (
        <div className="Home">
          {
            auth.isLoggedIn? <h1> Olá, <b style={{color:'rgb(255, 194, 102)'}}>{auth.user.name}</b> </h1> : ''
          }
          
           <div className="tags">
                  {tags.length? tags.map((tag,index) => {
                    const tagName = tag
                    return (
                  
                      <button 
                        key={tagName}
                        style={active === index ? { backgroundColor: 'rgb(255, 194, 102)' } : {}}
                        className='tag-btn' 
                        onClick={()=>{
                          setActive(index)
                          getSentenceByTag(tagName)
                          
                          }}> 
                        {tag} 
                      </button>
                    )
                    }):''}
              </div>
                  <div className="main-text">
                    <h3>{sentence ? parse(sentence?.text) : ' '}</h3>
                    <div className="icons-btns">
                      <div className="icon-btn">
                        {like?
                        <>
                          <FaHeart 
                            style={{color:'rgb(255, 194, 102)'}} 
                            onClick={handleLikeBtn} /> 
                            <span className="like-btn-txt">
                              {sentence.favoriteCount?sentence.favoriteCount:'0'}
                            </span>
                          </>
                          :
                          <>
                            <FaRegHeart style={{color:'rgb(255, 194, 102)'}} onClick={handleLikeBtn}/>
                            <span className="like-btn-txt">
                              {sentence.favoriteCount?sentence.favoriteCount:'0'}
                              </span>
                          </>  
                          }
                      </div>
                    </div>
                  </div>
                  <br />
                  <button className="add-btn" onClick={getSentence}>{ <FaPlus />} New sentence</button>
           </div>
    )
}

const mapStateToProps = (state) => {
  return {
      auth: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      singin: (userState) => {
          dispatch(SignUpAuthAction(userState))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)