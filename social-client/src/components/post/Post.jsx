import "./post.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comment from '../comment/Comment';

export default function Post({post}) {
		const [like, setLike] = useState(post.likes.length)
		const [user, setUser] = useState({})
		const [isLiked, setIsLiked] = useState(false)
		const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;
		const {user: currentUser} = useContext(AuthContext)
		const [showBoxEvent, setShowBoxEvent] = useState(false)
		const [showInputUser, setShowInputUser] = useState(false)

		const [comment, setComment] = useState([])

		const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [newComment, setNewComment] = useState('')


		useEffect(() => {
			const fetchPost = async () => {
					const res = await axios.get('/comments/'+post._id);
					setComment(res.data);
			};
			fetchPost();
	}, [post._id])

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

		const deletePost = () => {
			try {
				axios.delete("/posts/"+post._id, { data: { userId:currentUser._id }})
				window.location.reload()
		} catch (error) {
		}
		}

		const handleShowComment = () => {
			setShowInputUser(true)
		}

		const handleSubmit = async (e) => {
			e.preventDefault()
			const commentt = {
				sender: currentUser._id,
				text: newComment,
				postId: post._id
			}
			try {
				const res = await axios.post('/comments', commentt)
				setComment([...comment, res.data])
				setNewComment('')
			} catch (error) {
				console.log(error)
			}
		}
		
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
										<MoreHorizIcon className="postTopIcon" onClick={() => setShowBoxEvent(!showBoxEvent)}/>
										{
											showBoxEvent &&
											<div className="postTopRight__event">
												{
													post.userId === currentUser._id ?
													<>
														<div className="postTopRight__event__delete" onClick={deletePost}>Xoa</div>
														<div className="postTopRight__event__edit">Sua</div>
													</> :

													<>
														<div className="postTopRight__event__delete">ok</div>
														<div className="postTopRight__event__edit">eko</div>
													</>
												}
											</div>
										}
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
												<span className="countLike">{isLiked ? `bạn và ${like - 1} người khác` : like}</span>
										</span>
										<span className="countComments">
												<span className="countComment">{comment.length} lượt bình luận</span>
												<span className="countShare">505k luot chia se</span>
										</span>
								</div>
								<hr className="postBottmHr"/>
								<div className="postBottomEvent">
										<div className={isLiked ? 'liked postBottmClick' : "postBottomLike postBottmClick"} onClick={likeHander}>
												<ThumbUpAltIcon className='postBtnIcon'/>
												<span>Thich</span>
										</div>
										<span onClick={handleShowComment} className="postBottomComment postBottmClick">
												<ChatBubbleOutlineIcon className='postBtnIcon'/>
												<span>Binh luan</span>
										</span>
										<span className="postBottomLike postBottmClick">
												<ThumbUpAltIcon className='postBtnIcon'/>
												<span>Chia se</span>
										</span>
								</div>
								{
									showInputUser &&
										<>
											<Comment comment = {comment} post = {post}/>
											<div className='input__user'>
												<img className='input__user__avatar' src={currentUser.profilePicture ? PF + currentUser.profilePicture : PF + 'person/noavatar.jpg'} alt="sfs" />
												<input 
													className='commentInput'
													onChange={(e) => setNewComment(e.target.value)}
													value={newComment}
													placeholder='Viết bình luận...'/>
													<button onClick={handleSubmit}>Gui</button>
											</div>
										</>
								}
						</div>
				</div>
		)
}
