import "./rightbar.css"
import Search from "@mui/icons-material/Search"
import MoreHoriz from "@mui/icons-material/MoreHoriz"
import { Users } from "../../myData"
import UserOnline from "../userOnline/UserOnline"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function RightBar({ user }) {

  const [friends, setFriends] = useState([])
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id)
        setFriends(friendList.data)
      } catch (err) {
        console.log(err)
      }
    }
    getFriends()
  }, [user])

  const HomeRightbar = () => {
    return(
        <>
            <div className="rightbarHeader">
            <span className="rightbarHeaderText">Người liên hệ</span>
            <span className="rightbarHeaderIcons">
                <Search />
                <MoreHoriz />
                <MoreHoriz />
            </span>
            </div>
            <ul className="rightbarFriendList">
                {Users.map((userr) => (
                    <UserOnline key={userr.id} user={userr}/>
                ))}
            </ul>
        </>
    )
}

const ProfileRightbar = () => {
    const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
      <>
        <div className="introduce">
          <h2>Giới thiệu</h2>
          <p>Den tu {user.from}</p>
          <p>Sống tại {user.city}</p>
        </div>
        <div className="introProfile">
          <div className="profileTitle">
            <h2>Bạn bè</h2>
            <p>Xem tất cả bạn bè</p>
          </div>
          <p className="totalFriend">433k người bạn</p>
          <div className="profileListFriend">
            {friends.map((friend, index) => (
              <Link to={"/profile/"+friend.username} style={{textDecoration: 'none', color: 'black'}}>
                <div key={index} className="profileFollowing">
                  <img src={friend.profilePicture ? PFIM+friend.profilePicture : PFIM+"person/noavatar.jpg"} alt="" />
                  <p className="profileFollowingName">{friend.username}</p>
                </div>
              </Link>
            ))}
          </div>      
        </div>
      </>
    )
  }
  return (
      <div className="rightbar">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
  )
}

