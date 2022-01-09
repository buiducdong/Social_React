import Feed from "../../components/feed/Feed";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Profile() {
  const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const username = useParams().username;
  const [file, setFile] = useState(null);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user._id]);

  const handleSubmitt = async (e) => {
    e.preventDefault();
    const updateUser = {
      userId: user._id,
      username,
    };
    if (file) {
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file);
      updateUser.profilePicture = fileName;
      try {
        await axios.post("/upload", formData);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.put(`/users/${user._id}`, updateUser);
      const res = await axios.get(`/users?userId=${currentUser._id}`);
      console.log(res);
      dispatch({ type: "UPDATEUSER", payload: res.data });
      window.location.reload();
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleClickFollow = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };
  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileTop">
          <div className="profileTopHeader">
            <img
              className="profileBackground"
              src={user.coverPicture || `${PFIM}post/slide01.jpg`}
              alt="img"
            />
            <img
              style={{
                cursor: currentUser.username === username ? "pointer" : "default",
              }}
              onClick={() => {
                currentUser.username === username && setShow(!show);
              }}
              className="profileAvatar"
              src={
                user.profilePicture
                  ? PFIM + user.profilePicture
                  : PFIM + "person/noavatar.jpg"
              }
              alt="img"
            />
            <h2 className="profileTopHeaderName">{user.username}</h2>
            <span>{user.desc || "(hihi)"}</span>
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
              <span onClick={handleClickFollow} className="profileAddnew">
                {currentUser.username === username
                  ? "Thêm vào tin"
                  : followed
                  ? "Đang theo dõi"
                  : "Theo dõi"}
              </span>
              <span className="profileEdit">
                {currentUser.username === username
                  ? "Chỉnh sửa trang cá nhân"
                  : "Nhắn tin"}
              </span>
            </ul>
          </div>
          {currentUser.username === username && show && (
            <div className="create__post">
              <div className="post__title">
                <h3>Chọn ảnh đại diện</h3>
                <span
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  x
                </span>
              </div>
              <form className="post__body" onSubmit={handleSubmitt}>
                <div className="post__image">
                  <div className="add-img">
                    <label htmlFor="file" className="add-image">
                      <h5>Them anh/video</h5>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                    {file && (
                      <div className="shareImg">
                        <img src={URL.createObjectURL(file)} alt="img" />
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
                  <button type="submit">Update</button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="profileBottom">
          <div className="wide">
            <div className="profileBottomLeft">
              <Rightbar user={user} />
            </div>
            <div className="profileBottomRight">
              <Feed username={username} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
