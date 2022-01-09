import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./story.css";

function Story({ story }) {
  console.log(story);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const CL_IMG = process.env.REACT_APP_CLOUNDINARY_IMAGE;

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${story.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [story.userId]);
  return (
    <>
      <div className="story">
        <img
          className="img__story"
          src={
            story.image
              ? "https://res.cloudinary.com/bonba/image/upload/v1641221897/social-react/" +
                story.image +
                ".jpg"
              : PF + "post/slide01.jpg"
          }
          alt=""
        />
        <img
          className="avatar__story"
          src={
            user.profilePicture ? PF + user.profilePicture : PF + "person/noavatar.jpg"
          }
          alt=""
        />
        <p className="username">{user.username}</p>
      </div>
    </>
  );
}

export default Story;
