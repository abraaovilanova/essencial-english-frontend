import React, {useState, useEffect} from 'react'
import './TagCard.css'

const TagCard = ({
    tagName,
    index,
    setActive,
    getSentenceByTag,
    setSelectedTag,
    setShowTags,
    tagPercent,
    auth
}) => {

    const handleOnClick = () => {
        setActive(index)
        getSentenceByTag(tagName)
        setSelectedTag(tagName)
        setShowTags(false)
    }

    return (
            <div className="tag-btn" onClick={handleOnClick}>
                <h3 className="btn-txt">{tagName}</h3>
                {auth?
                    <div className="bar" style={{backgroundColor: "gray", borderRadius: "10px"}}>
                        <div className="progressbar" style={{height:"24px", width:`${tagPercent*100}%`, backgroundColor:"#d175b7", borderRadius: "10px"}}>
                            {tagPercent*100 > 5? <div className="shaddow-progress"></div>: ''}
                        </div>
                    </div>
                :''}
            </div>
    )
}

export default TagCard