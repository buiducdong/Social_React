import Feed from "../../components/feed/Feed"
import Topbar from "../../components/topbar/Topbar"
import "./profile.css"
import Rightbar from "../../components/rightbar/Rightbar"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
    const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;

    const [user, setUser] = useState({})
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data)
        };
        fetchUser();
    }, [username])
    return (
        <>
            <Topbar />
            <div className="profile">
                <div className="profileTop">
                    <div className="profileTopHeader">
                        <img className="profileBackground" src={user.coverPicture || `${PFIM}post/slide01.jpg`} alt="" />
                        <img className="profileAvatar" src={user.profilePicture || PFIM+"person/noavatar.jpg"} alt="" />
                        <h2 className="profileTopHeaderName">{user.username}</h2>
                        <span>{user.desc || "..."}</span>
                    </div>
                    <hr />
                    <div className="profileTopContent">
                        <ul className="profileTopContentSelect">
                            <li>Bài viết</li>
                            <li>Giới thiệu</li>
                            <li>Bạn bè</li>
                            <li>Ảnh</li>
                            <li>Xem thêm</li>
                        </ul>
                        <ul className="profileTopContentButtom">
                            <span className="profileAddnew">Thêm vào tin</span>
                            <span className="profileEdit">Chỉnh sửa trang cá nhân</span>
                        </ul>
                    </div>
                </div>
                <div className="profileBottom">
                    <div className="wide">
                        <div className="profileBottomLeft">
                            <Rightbar user={user}/>
                        </div>
                        <div className="profileBottomRight">
                            <Feed username={username}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
