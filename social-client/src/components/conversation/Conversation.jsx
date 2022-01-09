import './conversation.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Conversation({conversation, currentUser}) {

  const [user, setUser] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id)
    const getUser = async () => {
      try {
        const res = await axios.get('/users?userId='+ friendId)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [currentUser, conversation])

  return (
    <div className='conversation'>
      <img className='conversation__image' src={user?.profilePicture ?PF+ user.profilePicture : PF + 'person/noavatar.jpg'} alt="" />
      <h3 className='conversation__name'>{user?.username}</h3>
    </div>
  )
}

export default Conversation
