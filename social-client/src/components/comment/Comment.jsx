import React, { useState } from "react";
import "./comment.css";
import Commentt from "../commentt/Commentt";

function Comment({ post, comment }) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [showComents, setShowComments] = useState(false);
  // const [newComment, setNewComment] = useState('')

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const commentt = {
  //     sender: currentUser._id,
  //     text: newComment,
  //     postId: post._id
  //   }
  //   try {
  //     await axios.post('/comments', commentt)
  //     setNewComment('')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="comments">
      {showComents && comment.map((cm) => <Commentt key={cm._id} comment={cm} />)}
      {/* <div className='input__user'>
        <img className='input__user__avatar' src={currentUser.profilePicture ? PF + currentUser.profilePicture : PF + 'person/noavatar.jpg'} alt="sfs" />
        <input 
          className='commentInput'
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          placeholder='Viết bình luận...'/>
          <button onClick={handleSubmit}>Gui</button>
      </div>
      <h5 onClick={() => setShowComments(true)} className='showComment'>Xem bình luận</h5> */}
      <h5 onClick={() => setShowComments(true)} className="showComment">
        Xem bình luận
      </h5>
    </div>
  );
}

export default Comment;
