import './message.css'
import {format} from 'timeago.js'

import React, { useContext, memo } from 'react'
import { AuthContext } from '../../context/AuthContext'
function Message({own, message, receiverUser}) {

  console.log(receiverUser)
  const {user: currentUser} = useContext(AuthContext)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="message__top">
        <img className='message--image' 
          src={own && currentUser.profilePicture ? PF+currentUser.profilePicture : (receiverUser.profilePicture ? PF+receiverUser.profilePicture : PF + 'person/noavatar.jpg')} alt="" />
        <p className="message--text">{message.text}</p>
      </div>
      <div className="message__bottom">
        <p>{format(message.createdAt)}</p>
      </div>
    </div>
  )
}

export default memo(Message)
