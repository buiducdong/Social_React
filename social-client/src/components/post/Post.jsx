import "./post.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Users } from "../../myData";
import { useState } from "react";

export default function Post({post}) {
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)
    const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHander = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={PFIM+Users.filter(user => user.id === post?.userId)[0].profilePicture} alt="" />
                    <span>
                        <h4 className="postName">
                            {Users.filter(user => user.id === post?.userId)[0].username}
                        </h4>
                        <p className="postDate">{post.date}</p>
                    </span>
                </div>
                <div className="postTopRight">
                    <MoreHorizIcon className="postTopIcon"/>
                </div>
            </div>
            <div className="postCenter">
                <div className="postCenterTitle">
                    <span>{post.desc}</span>
                </div>
                <div className="postCenterImg">
                    <img src={PFIM+post.photo} alt="" />
                </div>
            </div>
            <div className="postBottom">
                <div className="posBottomIcon">
                    <span className="postIcons">
                        <img src="/assets/like.jfif" alt="" onClick={likeHander}/>
                        <img src="/assets/heart.png" onClick={likeHander} alt="" />
                        <span className="countLike">{like}</span>
                    </span>
                    <span className="countComments">
                        <span className="countComment">{post.comment} lượt bình luận</span>
                        <span className="countShare">505k luot chia se</span>
                    </span>
                </div>
                <hr className="postBottmHr"/>
                <div className="postBottomEvent">
                    <div className="postBottomLike postBottmClick" onClick={likeHander}>
                        <ThumbUpAltIcon className='postBtnIcon'/>
                        <span>Thich</span>
                    </div>
                    <span className="postBottomComment postBottmClick">
                        <ChatBubbleOutlineIcon className='postBtnIcon'/>
                        <span>Binh luan</span>
                    </span>
                    <span className="postBottomLike postBottmClick">
                        <ThumbUpAltIcon className='postBtnIcon'/>
                        <span>Chia se</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
