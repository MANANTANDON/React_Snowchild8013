import React from 'react'

export const About = props =>{
    
    const goBackHandler = () =>{
        props.aboutToApp(true)
    } 
    
    return(
        <React.Fragment>
            this is a social media in disguise....
            <button onClick = {goBackHandler}>go back</button>
        </React.Fragment>
    )
}