import React from 'react'
import parse from 'html-react-parser'
import { connect } from 'react-redux'
import './TextCard.css'

import { FaHeart, FaRegHeart, FaPlus,FaRegQuestionCircle } from "react-icons/fa"
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai"

const TextCard = ({ sentence, showLike, like, auth, userView, handleLikeBtn}) => {
    return (
        <div className="main-text" style={{border: userView? '2px solid #d5f591' : "rgb(29,29,29)"}}>
            <h3 className={userView? 'user-view':''}>{parse(sentence.text)}</h3>
            <div className="icons-btns">
                      <div className="icon-btn">
                        {showLike && auth.isLoggedIn?
                          (like?
                          <>
                            <FaHeart className='like-btn-active'
                              style={{color:'red'}} 
                              onClick={handleLikeBtn} /> 
                              <span className="like-btn-txt" style={{color:'red'}}>
                                {sentence.favoriteCount?sentence.favoriteCount:'0'}
                              </span>

                              
                            </>
                            :
                            <>
                              <FaRegHeart /* style={{color:'gray'}}*/ onClick={handleLikeBtn}/>
                              <span className="like-btn-txt">
                                {sentence.favoriteCount?sentence.favoriteCount:'0'}
                                </span>
                            </>  
                          )
                        :
                        ('')
                        }
                      </div>
                      <div class="tooltip">
                         <FaRegQuestionCircle />
                        <span class="tooltiptext">{sentence.information? parse(sentence.information):'...'}</span>
                    </div>
                </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
  }
  

export default connect(mapStateToProps)(TextCard)