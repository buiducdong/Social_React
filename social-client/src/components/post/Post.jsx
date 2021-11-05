import "./post.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
		const [like, setLike] = useState(post.likes.length)
		const [user, setUser] = useState({})
		const [isLiked, setIsLiked] = useState(false)
		const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;
		const {user: currentUser} = useContext(AuthContext)

		useEffect(() => {
				setIsLiked(post.likes.includes(currentUser._id))
		}, [post.likes, currentUser._id])

		const likeHander = () => {
				try {
						axios.put("/posts/"+post._id+"/like", { userId:currentUser._id })
				} catch (error) {
				}
				setLike(isLiked ? like - 1 : like + 1)
				setIsLiked(!isLiked)
		}



		useEffect(() => {
				const fetchUser = async () => {
						const res = await axios.get(`/users?userId=${post.userId}`);
						setUser(res.data)
				};
				fetchUser();
		}, [post.userId])
		return (
				<div className="post">
						<div className="postTop">
								<div className="postTopLeft">
										<Link to={`profile/${user.username}`}>
												<img className="avatarPost" src={user.profilePicture ? PFIM + user.profilePicture : PFIM + 'person/noavatar.jpg'} alt="" />
										</Link>
										<span>
												<h4 className="postName">
														{user.username}
												</h4>
												<p className="postDate">{format(post.updatedAt)}</p>
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
										<img src={PFIM+post.img} alt="" />
								</div>
						</div>
						<div className="postBottom">
								<div className="posBottomIcon">
										<span className="postIcons">
												<img src={`${PFIM}like.jfif`} alt="" />
												<img src={`${PFIM}heart.png`}  alt="" />
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
