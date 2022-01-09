import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import Story from "../stories/Stories";
import axios from "axios";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/");
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user._id]);

  const HomeFeed = () => {
    return (
      <div className="feed">
        <div className="feedWrapper">
          <Story />
          <Share home />
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
    );
  };
  const ProfileFeed = () => {
    return (
      <>
        {username === user.username && <Share home />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </>
    );
  };

  return <>{username ? <ProfileFeed /> : <HomeFeed />}</>;
}
