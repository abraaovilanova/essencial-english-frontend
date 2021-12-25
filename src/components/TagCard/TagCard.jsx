import React from 'react'
import './TagCard.css'

const TagCard = ({
    tagName,
    index,
    setActive,
    getSentenceByTag,
    setSelectedTag,
    setShowTags
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
        </div>
    )
}

export default TagCard