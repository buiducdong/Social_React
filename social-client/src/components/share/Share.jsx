import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

export default function Share({home}) {

    const HomeShare = () => {
        return (
            <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src="/assets/person/1.jpg" alt="" />
                    <input type="text" placeholder="Dat oi, Ban dang nghi gi the ?"/>
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <VideoCameraFrontIcon className="shareIcon"/>
                            <span className="Video">
                                Video trực tiếp
                            </span>
                        </div>
                        <div className="shareOption">
                            <PermMediaIcon className="shareIcon"/>
                            <span className="Video">
                                Ảnh/ Video
                            </span>
                        </div>
                        <div className="shareOption">
                            <PermMediaIcon className="shareIcon"/>
                            <span className="Video">
                                Cảm xúc/Hoạt động
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    const ProfileShare = () => {
        return (
            <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src="/assets/person/1.jpg" alt="" />
                    <input type="text" placeholder="Dat oi, Ban dang nghi gi the ?"/>
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <VideoCameraFrontIcon className="shareIcon"/>
                            <span className="Video">
                                Video trực tiếp
                            </span>
                        </div>
                        <div className="shareOption">
                            <PermMediaIcon className="shareIcon"/>
                            <span className="Video">
                                Ảnh/ Video
                            </span>
                        </div>
                        <div className="shareOption">
                            <PermMediaIcon className="shareIcon"/>
                            <span className="Video">
                                Sự kiện trong đời
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }


    return (
        <>
            {home ? <HomeShare /> : <ProfileShare />}
        </>
    )
}
