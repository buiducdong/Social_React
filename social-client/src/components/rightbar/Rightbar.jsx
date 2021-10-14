import "./rightbar.css"
import Search from "@mui/icons-material/Search"
import MoreHoriz from "@mui/icons-material/MoreHoriz"
import { Users } from "../../myData"
import UserOnline from "../userOnline/UserOnline"
export default function RightBar({ user }) {
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
                        <div className="profileFollowing">
                            <img src={`${PFIM}person/1.jpg`} alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src={`${PFIM}person/1.jpg`} alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src={`${PFIM}person/1.jpg`} alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src={`${PFIM}person/1.jpg`} alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src={`${PFIM}person/1.jpg`} alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
                        <div className="profileFollowing">
                            <img src={`${PFIM}person/1.jpg`} alt="" />
                            <p className="profileFollowingName">Tam mao</p>
                        </div>
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

