import React from 'react'

import postCard from './Post.module.css'

export const Post = props =>{
    return(
        <React.Fragment>
            <hr />
            <div className={postCard.postContainer}>
                <img src = {props.profilePic}  className = {postCard.postProfilePicture} height = '60px' width= '60px' />
                <span className = {postCard.userPostDetails}>@<strong>{props.uName}</strong></span>
                <span className = {postCard.dateField}> - {props.postDate}</span>
                <div className = {postCard.caption}>{ props.postCaption }</div>
                {props.post && <img src = {props.post} className = { postCard.userPost } height = '450px' width='90%'/>}
            </div>
        </React.Fragment>
    )
}
