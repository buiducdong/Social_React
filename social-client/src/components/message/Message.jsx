import './message.css'
import {format} from 'timeago.js'

import React from 'react'

function Message({own, message}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="message__top">
        <img className='message--image' src={PF + 'person/hinh.jpg'} alt="" />
        <p className="message--text">{message.text}</p>
      </div>
      <div className="message__bottom">
        <p>{format(message.createdAt)}</p>
      </div>
    </div>
  )
}

export default Message
