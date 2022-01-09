import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./createStory.css";

function CreateStory() {
  const { user: currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const history = useHistory();
  console.log(file);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStory = {
      userId: currentUser._id,
      desc: "",
    };
    if (file) {
      console.log(file.name);
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file);
      newStory.image = fileName;
      try {
        const ress = await axios.post("/uploads/", formData);
        console.log(ress);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("/stories", newStory);
      history.push("/");
    } catch (error) {}
  };

  return (
    <>
      <Topbar></Topbar>
      <div className="create">
        <div className="sidebar">{currentUser.username}</div>
        <div className="container">
          <form className="form-container" onSubmit={handleSubmit}>
            <label className="add__img-story" htmlFor="file">
              <input
                style={{ display: "none" }}
                id="file"
                type="file"
                onChange={handlePreviewImg}
              />
              <p>Tạo tin ảnh</p>
              {file && <img className="previewImg" src={file.preview} alt="" />}
            </label>
            <label className="add__desc-story" htmlFor="file">
              <input style={{ display: "none" }} id="file" type="file" />
              <p>Tạo tin dạng văn bản</p>
            </label>
            <button type="submit">Tao story</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateStory;
