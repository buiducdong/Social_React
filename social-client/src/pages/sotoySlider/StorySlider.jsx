import React, { useEffect, useState } from "react";
import "./storySlider.css";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import axios from "axios";

function StorySlider() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [stories, setStories] = useState([]);
  useEffect(() => {
    const fetchStrories = async () => {
      const res = await axios.get("/stories");
      setStories(res.data.slice(0, 4));
    };
    fetchStrories();
  }, []);
  return (
    <>
      {/* <Swiper
        slidesPerView={2}
        grabCursor={true}
        spaceBetween={0}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {stories.map((story) => (
          <SwiperSlide>
            <img
              src={
                story.image
                  ? "https://res.cloudinary.com/bonba/image/upload/v1641221897/social-react/" +
                    story.image +
                    ".jpg"
                  : PF + "post/slide01.jpg"
              }
              alt="w"
            ></img>
          </SwiperSlide>
        ))}
      </Swiper> */}
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </>
  );
}

export default StorySlider;
