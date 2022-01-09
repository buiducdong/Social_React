import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import axios from 'axios'
import {format} from "timeago.js"

function Commentt({comment}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [user, setUser] = useState()

  useEffect(() => {
    const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${comment.sender}`);
        setUser(res.data)
    };
    fetchUser();
}, [comment])
console.log(user)
  return (
    <>
              <div key={comment._id} className="comment">
                <img className='comments__avatar-user' src={user?.profilePicture ? PF + user.profilePicture : PF + 'person/noavatar.jpg'} alt="" />
                <div>
                  <div className="comment__content">
                    <h5 className='comment__content__username'>{user?.username}</h5>
                    <p className='comment__content__text'>{comment.text}</p>
                  </div>
                  <p style={{fontSize: '12px'}}>
                    {format(comment.updatedAt)}
                  </p>
                </div>
                <MoreHorizIcon />
              </div>
    </>
  )
}

export default Commentt
