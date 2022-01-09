import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Share({ home }) {
  const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handlePreviewImg = (e) => {
    const imgFile = e.target.files[0];

    imgFile.preview = URL.createObjectURL(imgFile);
    setFile(imgFile);
  };
  const handleSubmitt = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      console.log(file.name);
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", formData);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.post("/posts", newPost);
      console.log(res);
      window.location.reload();
    } catch (error) {}
  };

  const HomeShare = () => {
    return (
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              src={
                user.profilePicture
                  ? PFIM + user.profilePicture
                  : PFIM + "person/noavatar.jpg"
              }
              alt="avatar"
            />
            <span
              onClick={() => {
                setShow(!show);
              }}
            >{`${user.username} oi, Ban dang nghi gi the ?`}</span>
          </div>
          <hr className="shareHr" />
          <div className="shareBottom" onSubmit={handleSubmitt}>
            <div className="shareOptions">
              <div className="shareOption">
                <VideoCameraFrontIcon className="shareIcon" />
                <span className="Video">Video trực tiếp</span>
              </div>
              <div
                onClick={() => {
                  setShow(!show);
                }}
                className="shareOption"
              >
                <PermMediaIcon className="shareIcon" />
                <span className="Video">Ảnh/ Video</span>
              </div>
              <div className="shareOption">
                <PermMediaIcon className="shareIcon" />
                <span className="Video">Cảm xúc/Hoạt động</span>
              </div>
            </div>
          </div>
        </div>
        {/* create post */}
        {show && (
          <div className="create__post">
            <div className="post__title">
              <h3>Tạo bài viết</h3>
              <span
                onClick={() => {
                  setShow(!show);
                }}
              >
                x
              </span>
            </div>
            <form className="post__body" onSubmit={handleSubmitt}>
              <div className="post__header">
                <div className="post__avatar">
                  <img
                    src={
                      user.profilePicture
                        ? PFIM + user.profilePicture
                        : PFIM + "person/noavatar.jpg"
                    }
                    alt="avatar"
                  />
                </div>
                <div className="name">
                  <h5>{user.username}</h5>
                  <span>Bạn bè</span>
                </div>
              </div>
              <div className="post__image">
                <div className="post__things">
                  <input
                    ref={desc}
                    type="text"
                    placeholder={`${user.username} oi, Ban dang nghi gi the ?`}
                  />
                </div>
                <div className="add-img">
                  <label htmlFor="file" className="add-image">
                    <h5>Thêm ảnh/video</h5>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      onChange={handlePreviewImg}
                    />
                  </label>
                  {file && (
                    <div className="shareImg">
                      <img src={file.preview} alt="img" />
                      <CancelIcon
                        className="cancelImg"
                        onClick={() => {
                          setFile(null);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="post__bottom">
                <button type="submit">Đăng</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };
  const ProfileShare = () => {
    return (
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img src="/assets/person/1.jpg" alt="" />
            <input type="text" placeholder="Dat oi, Ban dang nghi gi the ?" />
          </div>
          <hr className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <VideoCameraFrontIcon className="shareIcon" />
                <span className="Video">Video trực tiếp</span>
              </div>
              <div className="shareOption">
                <PermMediaIcon className="shareIcon" />
                <span className="Video">Ảnh/ Video</span>
              </div>
              <div className="shareOption">
                <PermMediaIcon className="shareIcon" />
                <span className="Video">Sự kiện trong đời</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{home ? <HomeShare /> : <ProfileShare />}</>;
}
