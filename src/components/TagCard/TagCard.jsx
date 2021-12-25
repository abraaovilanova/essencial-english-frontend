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
            <div className="tag-header">
                <p className="btn-txt">{tagName}</p>
            </div>
        </div>
    )
}

export default TagCard