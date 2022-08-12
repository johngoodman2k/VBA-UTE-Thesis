import React, { useEffect, useState, useRef } from "react";
import styles from "./slider2.module.scss";
import classNames from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";

import "swiper/scss";

const cx = classNames.bind(styles);

const data = [
  {
    name: "CanTho Catfish",
    img: "http://media.tinthethao.com.vn/files/news/2019/09/17/so-sanh-tong-quan-truoc-playoff-vba-2019--cantho-catfish-vs-thang-long-warriors-p1-144658.jpg",
    des: "Lê Hiếu Thành is good",
  },
  {
    name: "SaiGon Heat",
    img: "https://news-thumb2.ymgstatic.com/YanThumbNews/2167221/202205/00de3d67-d53e-4a86-b621-7701a2186117.jpg",
    des: "Khoa Pham is friendlys",
  },
  {
    name: "NhaTrang Dolphins",
    img: "https://cdnmedia.webthethao.vn/uploads/2020-11-12/khoa-tran-bi-cam-thi-dau-loi-ky-thuat-1.JPG",
    des: "Khoa Pham is friendlys",
  },
  {
    name: "DaNang Dragon",
    img: "https://nguoinoitieng.tv/images/nnt/104/2/bhtt.jpg",
    des: "Trung Kien is god",
  },
];

export const Slider2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const imgRef = useRef<any>();

  const handleMouseOverImg = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={` ${cx("Slider")}`}>
      <div className={`${cx("Slider__ImageBlock")}`}>
        <div className={`${cx("Slider__ImageBlock__Image")}`}>
          {data.map((item, index) => {
            return (
              <div className={cx("Slider__ImageBlock__Image__ImageFrame")}>
                <a
                  href="/"
                  className={cx(
                    "Slider__ImageBlock__Image__ImageFrame__ImageChild"
                  )}
                >
                  <img
                    alt="ok"
                    className={` ${cx(
                      "Slider__ImageBlock__Image__ImageFrame__ImageChild__default",
                      index === currentIndex
                        ? "Slider__ImageBlock__Image__ImageFrame__ImageChild__default--active"
                        : ""
                    )}`}
                    src={item.img}
                  ></img>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${cx("Slider__DescriptionBlock")}`}>
        <div className={cx("Slider__DescriptionBlock__Driver")}></div>
        <div className={cx("Slider__DescriptionBlock__DescriptionFrame")}>
          {data.map((item, index) => {
            return (
              <div
                className={cx(
                  "Slider__DescriptionBlock__DescriptionFrame__Description",
                  index === currentIndex
                    ? "Slider__DescriptionBlock__DescriptionFrame__Description--active"
                    : ""
                )}
              >
                {item.des}
              </div>
            );
          })}
        </div>
      </div>

      <div className={cx("Slider__Footer")}>
        <div className={cx("Slider__Footer__FooterWrap")}>
          <div className={cx("Slider__Footer__FooterWrap__CurrentNumber")}>
            {data.map((item, index) => {
              return (
                <div
                  className={cx(
                    "Slider__Footer__FooterWrap__CurrentNumber__Number",
                    currentIndex === index
                      ? "Slider__Footer__FooterWrap__CurrentNumber__Number--active"
                      : ""
                  )}
                >
                  {currentIndex + 1 < 10
                    ? "0" + (currentIndex + 1)
                    : currentIndex + 1}
                </div>
              );
            })}
          </div>
          <div className={cx("Slider__Footer__FooterWrap__Driver")}></div>
          <div className={cx("Slider__Footer__FooterWrap__TotalNumber")}>
            10
          </div>
        </div>
        {/* <div className={cx("Slider__Footer__DriverFrame")}>
          
        </div> */}
        {/* <div className={cx("Slider__Footer__TotalNumber")}>
          <div className={cx("Slider__Footer__TotalNumber__Number")}>10</div>
        </div> */}
      </div>

      <div className={`${cx("Slider__Swiper")}`}>
        <Swiper
          modules={[Mousewheel]}
          spaceBetween={0}
          slidesPerView="auto"
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
              style={{ transform: "translateX(2em)" }}
              className={` ${cx("Slider__Swiper__SwiperItem")} `}
              onMouseOver={() => {
                handleMouseOverImg(index);
              }}
            >
              <div
                data-number={index + 1 < 10 ? "0" + (index + 1) : index + 1}
                className={`${cx("Slider__Swiper__SwiperItem--titleItem")}`}
              >
                {data.name}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
