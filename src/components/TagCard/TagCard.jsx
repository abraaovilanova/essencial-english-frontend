import React, {useState, useEffect} from 'react'
import './TagCard.css'

const TagCard = ({
    tagName,
    index,
    setActive,
    getSentenceByTag,
    setSelectedTag,
    setShowTags
}) => {

    const [rand, setRand] = useState(Math.floor(Math.random() * 100))


    const handleOnClick = () => {
        setActive(index)
        getSentenceByTag(tagName)
        setSelectedTag(tagName)
        setShowTags(false)
    }

    return (
<<<<<<< HEAD
            <div className="tag-btn" onClick={handleOnClick}>
                <h3 className="btn-txt">{tagName}</h3>
                <div className="bar" style={{backgroundColor: "gray", borderRadius: "10px"}}>
                    <div className="progressbar" style={{height:"24px", width:`${rand}%`, backgroundColor:"#d175b7", borderRadius: "10px"}}>
                        {rand > 5? <div className="shaddow-progress"></div>: ''}
                    </div>
                </div>
            </div>
=======
        <div className="tag-btn" onClick={handleOnClick}>
            <div className="tag-header">
                <p className="btn-txt">{tagName}</p>
            </div>
        </div>
>>>>>>> 0daa77940d72329d974359ce86d7aaedd73fd7b9
    )
}

export default TagCard