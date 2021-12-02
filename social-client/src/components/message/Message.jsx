import './message.css'
import {format} from 'timeago.js'

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Message({own, message}) {

  const {user} = useContext(AuthContext)


  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="message__top">
        <img className='message--image' src={own && user.profilePicture ? user.profilePicture : PF + 'person/hinh.jpg'} alt="" />
        <p className="message--text">{message.text}</p>
      </div>
      <div className="message__bottom">
        <p>{format(message.createdAt)}</p>
      </div>
    </div>
  )
}

export default Message
