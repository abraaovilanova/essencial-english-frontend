import React, { useState, useEffect} from 'react'
import axios from 'axios'
import parse from 'html-react-parser'
import Footer from '../Footer/Footer'
import './Home.css'

export default ()=>{
  const base_url_prod = 'https://essential-english-api.herokuapp.com/sentence'
  const base_url_dev = 'http://localhost:3001/sentence'
  const base_url = base_url_dev
  const [sentences, setSentences] = useState('')
  const [sentence, setSentence] = useState('')
  const [tags, setTags] = useState('')
  const [active, setActive] = useState()


  useEffect(()=>{
    axios.get(base_url + '/tags').then(res => {
      setTags(res.data.tags)
    })

  },[])

  
  const getSentence = () => {
    const max = sentences.length
    const num = Math.floor((Math.random()*max+1))
    const selectedSentence = sentences.length ? sentences[num-1] : {text:'Welcome to my english app! Please, select a tag'}
    setSentence(selectedSentence)
  }
  
  const getSentenceByTag = async (tag) => {
    const res = await axios.get(base_url + '/sentences/' +tag)
    setSentences(res.data.sentences)
  }

  
  useEffect(()=>{
    getSentence()

  },[sentences])


    return (
        <div className="Home">
           <div className="tags">
                  {tags.length? tags.map((tag,index) => {
                    const tagName = tag
                    return (
                  
                      <button 
                        style={active === index ? { backgroundColor: 'rgb(255, 194, 102)' } : {}}
                        className='tag-btn' onClick={()=>{
                          setActive(index)
                          getSentenceByTag(tagName)}}> 
                        {tag} 
                      </button>
                    )
                    }):''}
              </div>
                  <div className="main-text">
                    <h3>{sentence ? parse(sentence?.text) : ' '}</h3>
                  </div>
                  <button className="add-btn" onClick={()=>getSentence()}>New sentence</button>
                  <Footer />
           </div>
    )
}