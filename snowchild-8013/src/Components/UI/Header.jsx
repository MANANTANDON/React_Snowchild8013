import React from 'react'

// IMAGE import...
import logo from './logowolf_copy_1.png'
import logoShadow from './logo.png'

// CSS imports..
import headerCard from './Header.module.css'

//import bootstrap..
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'

export const Header = props =>{

    const ContactUsHandler = () =>{
        props.headerToAppContact(false)
        props.headerToAppAbout(true)
    }

    const AboutHandler = () =>{
        props.headerToAppAbout(false)
        props.headerToAppContact(true)
    }

    return(
        <React.Fragment>
            <div className= {headerCard.outerCard} >
                    <Col><img src = {logo} className = {headerCard.imageContainer} alt = 'logo1'/></Col>
                    <Col><img src = {logoShadow} className = {headerCard.imageContainerTwo} alt = 'logo2'/></Col>
                <button className={  headerCard.HB1 } onClick = {AboutHandler}>About</button>
                <button className = {headerCard.HB2} onClick = {ContactUsHandler}>Contact Us</button>

           </div>
           <hr className = {headerCard.hrTag}/>
        </React.Fragment>
    )
}

/*
style = {{border: '2px solid blue'}}
style = {{border: '2px solid pink'}} 
*/