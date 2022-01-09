import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Story from "../story/Story";
import "./stories.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { display } from "@mui/system";

export default function Stories() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [stories, setStories] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchStrories = async () => {
      const res = await axios.get("/stories");
      setStories(
        res.data
          .sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
          .slice(0, 4)
      );
    };
    fetchStrories();
  }, []);

  console.log(stories);

  return (
    <div className="stories">
      <Link style={{ textDecoration: "none" }} to={`/stories/create`} className="card">
        <img
          className="card__avatar"
          src={
            currentUser.profilePicture
              ? PF + currentUser.profilePicture
              : PF + "post/slide01.jpg"
          }
          alt=""
        />
        <AddCircleIcon fontSize="large" className="add__story"></AddCircleIcon>
        <p
          style={{
            color: "black",
            marginLeft: "50%",
            transform: "translateX(-50%)",
            marginTop: "10px",
          }}
        >
          Tao tin
        </p>
      </Link>
      <Link style={{ textDecoration: "none", display: "flex" }} to={`/stories`}>
        {stories.map((story) => (
          <Story key={story._id} story={story}></Story>
        ))}
      </Link>
    </div>
  );
}
