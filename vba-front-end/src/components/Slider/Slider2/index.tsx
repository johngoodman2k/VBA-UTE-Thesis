import React, { useEffect, useState, useRef } from "react";
import styles from "./slider2.module.scss";
import classNames from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";

import "swiper/scss";
import { transform } from "typescript";

const cx = classNames.bind(styles);

const data = [
  {
    name: "CanTho Catfish",
    img: "http://media.tinthethao.com.vn/files/news/2019/09/17/so-sanh-tong-quan-truoc-playoff-vba-2019--cantho-catfish-vs-thang-long-warriors-p1-144658.jpg",
  },
  {
    name: "SaiGon Heat",
    img: "https://news-thumb2.ymgstatic.com/YanThumbNews/2167221/202205/00de3d67-d53e-4a86-b621-7701a2186117.jpg",
  },
  {
    name: "NhaTrang Dolphins",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwix8hJJnHfyNbw-AY__-m2D2hzV50JjnEGQ&usqp=CAU",
  },
  {
    name: "DaNang Dragon",
    img: "https://nguoinoitieng.tv/images/nnt/104/2/bhtt.jpg",
  },
];

export const Slider2 = () => {
  const [currentImg, setCurrentImg] = useState(data[0].img);

  const handleMouseOverImg = (img: string, index: number) => {
    setCurrentImg(img);
  };

  return (
    <div className={` ${cx("Slider")}`}>
      <div className={`${cx("Slider__ImageBlock")}`}>
        <div className={`${cx("Slider__ImageBlock__Image")}`}>
          {data.map((data, i) => {
            return (
              <div className={cx("Slider__ImageBlock__Image__ImageFrame")}>
                <a
                  className={cx(
                    "Slider__ImageBlock__Image__ImageFrame__ImageChild"
                  )}
                >
                  <img
                    alt="ok"
                    className={` ${cx(
                      "Slider__ImageBlock__Image__ImageFrame__ImageChild--adjust",
                      data.img === currentImg ? "__active" : ""
                    )}`}
                    src={currentImg}
                  ></img>
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${cx("Slider__Swiper")}`}>
        <Swiper
          modules={[Mousewheel]}
          spaceBetween={0}
          slidesPerView={4}
          grabCursor={true}
          // centeredSlides={true}
          onSlideChange={(e) => console.log("48", e)}
          onSwiper={(swiper) => console.log(swiper)}
          //   autoplay={{ delay: 10000 }}
          mousewheel
          loop={true}
          className="w-full h-full bg-transparent"
        >
          {data.map((data, index) => (
            <SwiperSlide
              className={` ${cx("Slider__Swiper__SwiperItem")} `}
              onMouseOver={() => {
                handleMouseOverImg(data.img, index);
              }}
            >
              <div className={`${cx("Slider__Swiper__SwiperItem--titleItem")}`}>
                {data.name}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
