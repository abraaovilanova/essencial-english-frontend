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
  const [userTagPercent, setUserTagPercent] = useState('')




  useEffect(()=>{
    axios.post(base_url +'/sentence/tags', {userId: auth.user._id}).then(res => {
      setTags(res.data.tags)
      setUserTagPercent(res.data.userTagPercent)
    })

  },[])



  const handleBackBtn = async () =>{
    setShowTags(true)
    setActive('')
    setSelectedTag('')
    axios.post(base_url +'/sentence/tags', {userId: auth.user._id}).then(res => {
      setTags(res.data.tags)
      setUserTagPercent(res.data.userTagPercent)
    })
  }

  const nextSentence = async () => {

    if(!sentence.userViewList?.includes(auth.user._id)){
      await axios.post(url + '/view/'+sentence._id,{
        userId: auth.user._id 
      })
      const indexOfSentence = sentences.indexOf(sentence)
      const newArray = [...sentences, {...sentence, userViewList:[...sentence.userViewList, auth.user._id]}]
      newArray.splice(indexOfSentence, 1)
      setSentences(newArray)
    }

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
            auth.isLoggedIn && !selectedTag ? <h2> Hello, <b style={{color:'#d175b7'}}>{auth.user.name}</b> ! </h2> : ''
          }
          {showTags? 
           <div className="tags">
                  {tags.length? tags.map((tag,index) => {
                    const tagName = tag
                    return (
                      <TagCard 
                        tagPercent={userTagPercent[tag]}
                        auth = {auth.isLoggedIn}
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
              <button className="back-btn" onClick={handleBackBtn}><AiOutlineClose /></button>
              <span className="active-tag">{selectedTag} </span>
              <p className="small-txt">More than {sentences.length} sentences</p>
              {/* porcentagem: {sentences.reduce((value, curr) => console.log(value, curr))} */}
            </>
          }
          {
            !showTags?
                <>
                 <TextCard
                    userView={sentence.userViewList?.includes(auth.user._id)}
                    sentence={sentence? sentence : ' '} 
                    showLike={showLike}
                    like={like}
                    handleLikeBtn={handleLikeBtn}
                  />
                  <br />
                  <button className={sentence.userViewList?.includes(auth.user._id)? "add-btn-view":"add-btn"} onClick={nextSentence}>{ <FaPlus />} New sentence</button>
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

