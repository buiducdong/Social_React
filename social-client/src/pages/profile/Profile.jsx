import Feed from "../../components/feed/Feed"
import Topbar from "../../components/topbar/Topbar"
import "./profile.css"
import Rightbar from "../../components/rightbar/Rightbar"

export default function Profile() {
    return (
        <>
            <Topbar />
            <div className="profile">
                <div className="profileTop">
                    <div className="profileTopHeader">
                        <img className="profileBackground" src="assets/post/slide01.jpg" alt="" />
                        <img className="profileAvatar" src="assets/person/1.jpg" alt="" />
                        <h2 className="profileTopHeaderName">Duc Dat</h2>
                        <span>Thêm tiểu sử</span>
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
                            <Rightbar profile/>
                        </div>
                        <div className="profileBottomRight">
                            <Feed profile/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
