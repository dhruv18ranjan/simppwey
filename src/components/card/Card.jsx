import React from 'react'
import "./card.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong, faEnvelope, faLocation, faLocationDot, faMessage, faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion";

const Card = ({ username, img, email, name, followers, location, bio }) => {
  const projectVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };
  return (
    <motion.div variants={projectVariant} >

    <div className='card-container'>

      <div className='card-head'>
        <div className='card-img'>
          <img src={img} alt="ok" />
        </div>
        <div className='card-name'>
          <span>{name}</span>
          <span>@{username}</span>
        </div>
      </div>

      <div className='card-info'>
        <span> <FontAwesomeIcon icon={faPen} style={{color: "rgb(128, 128, 128)"}}/> &nbsp; {bio}</span> <br />
        <span> <FontAwesomeIcon icon={faEnvelope}  style={{color: "rgb(128, 128, 128)"}} />  &nbsp; {email}</span> <br />
        <span> <FontAwesomeIcon icon={faUser}  style={{color: "rgb(128, 128, 128)"}} /> &nbsp; {followers > 1000 ? parseInt(followers / 1000) + "K" : followers} &nbsp;  &nbsp;  &nbsp;  <FontAwesomeIcon icon={faLocationDot}  style={{color: "rgb(128, 128, 128)"}} /> &nbsp; {location} </span>
      </div>
      
    </div>
    </motion.div>
  )
}

export default Card