import React from 'react'

export const ContactUs = props =>{

    const goBackHandler = () =>{
        props.contactToApp(true)
    }
    return(
        <React.Fragment>
            EMAIL US @: SnowChild@gmail.com
            <button onClick = {goBackHandler}> go back </button>
        </React.Fragment>
    )
}