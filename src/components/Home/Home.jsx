import React, { useState, useEffect} from 'react'
import axios from 'axios'
import parse from 'html-react-parser'
import { connect } from 'react-redux'
import './Home.css'
import { SignUpAuthAction } from '../../redux/actions/authActions'

import { FaHeart, FaRegHeart, FaPlus,FaRegQuestionCircle } from "react-icons/fa"
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai"

import { url } from '../../api/api'
import TextCard from '../TextCard/TextCard'
import TagCard from '../TagCard/TagCard'

const Home = (props)=>{

  const base_url = url

  const { auth } = props
  const [sentences, setSentences] = useState([])
  const [sentence, setSentence] = useState('')
  const [tags, setTags] = useState('')
  const [active, setActive] = useState()
  const [like, setLike] = useState(false)
  const [showLike, setShowLike] = useState(false)
  const [randInt, setRandInt] = useState(0)
  const [showTags, setShowTags] = useState(true)
  const [selectedTag, setSelectedTag] = useState('')




  useEffect(()=>{
    axios.get(base_url +'/sentence/tags').then(res => {
      setTags(res.data.tags)
    })

  },[])

  const nextSentence = () => {
    const max = sentences.length
    const rand = Math.floor((Math.random()*(max)+0))
    const selectedSentence = sentences.length > 0 ? sentences[rand] : {
      text:'Welcome to my english app! Please, select a tag',
      favoriteUserId: ['admin'],
    }

    if(selectedSentence?.text != 'Welcome to my english app! Please, select a tag'){
      setShowLike(true)
    }


    if(selectedSentence.favoriteUserId?.includes(auth.user._id)){
      setLike(true)
    }else{
      setLike(false)
    }

    setSentence(selectedSentence)
  }


  const getSentence = () => {
    const rand = sentences.length -1
    const selectedSentence = sentences.length > 0 ? sentences[rand] : {
      text:'Welcome to my english app! Please, select a tag',
      favoriteUserId: ['admin'],
    }

    if(selectedSentence?.text != 'Welcome to my english app! Please, select a tag'){
      setShowLike(true)
    }


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
    const res = await axios.post(base_url + '/fav/' + sentence._id, { favoriteUserId: userId})
    const indexOfSentence = sentences.indexOf(sentence)
    const newArray = [...sentences, res.data.sentenceUpdate]
    newArray.splice(indexOfSentence, 1)


    if(res.data.sentenceUpdate.favoriteUserId?.includes(auth.user._id)){
      setLike(true)
    }else{
      setLike(false)
    }

    setSentences(newArray)
    const max = newArray.indexOf(res.data.sentenceUpdate)-1
    setRandInt(newArray.indexOf(res.data.sentenceUpdate))
  }

  useEffect(()=>{
    getSentence()

  },[sentences, setSentences])


    return (
        <div className="Home">
          {
            auth.isLoggedIn && !selectedTag ? <h2> Hello, <b style={{color:'#d175b7'}}>{auth.user.name}</b>! </h2> : ''
          }
          {showTags? 
           <div className="tags">
                  {tags.length? tags.map((tag,index) => {
                    const tagName = tag
                    return (
                      <TagCard 
                        tagName={tagName}
                        index={index}
                        setActive={setActive}
                        getSentenceByTag={getSentenceByTag}
                        setSelectedTag={setSelectedTag}
                        setShowTags={setShowTags}
                      />
                    )
                    }):''}
            </div>
            :
            <>
              <button className="back-btn" onClick={()=>{
                setShowTags(true)
                setActive('')
                setSelectedTag('')
              }}><AiOutlineClose /></button>
              <span className="active-tag">{selectedTag} </span>
              <p className="small-txt">More than {sentences.length} sentences</p>
            </>
          }
          {
            !showTags?
                <>
                 <TextCard 
                    sentence={sentence? sentence : ' '} 
                    showLike={showLike}
                    like={like}
                    handleLikeBtn={handleLikeBtn}
                  />
                  <br />
                  <button className="add-btn" onClick={nextSentence}>{ <FaPlus />} New sentence</button>
                  </>
                  :''}
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

