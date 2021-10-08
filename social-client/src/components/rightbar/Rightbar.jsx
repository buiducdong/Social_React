import "./rightbar.css"
import Search from "@mui/icons-material/Search"
import MoreHoriz from "@mui/icons-material/MoreHoriz"
import { Users } from "../../myData"
import UserOnline from "../userOnline/UserOnline"
export default function RightBar({ profile }) {

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
                    {Users.map((user) => (
                        <UserOnline key={user.id} user={user}/>
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return(
            <>
                <div className="introProfile">
                    <div className="profileTitle">
                        <h3>Bạn bè</h3>
                        <p>Xem tất cả bạn bè</p>
                    </div>
                    <p className="totalFriend">433k người bạn</p>
                    <div className="profileListFriend">
                        <div className="profileFollowing">
                            <img src="assets/person/1.jpg" alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src="assets/person/1.jpg" alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src="assets/person/1.jpg" alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src="assets/person/1.jpg" alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src="assets/person/1.jpg" alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src="assets/person/1.jpg" alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            {profile ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
    )
}

