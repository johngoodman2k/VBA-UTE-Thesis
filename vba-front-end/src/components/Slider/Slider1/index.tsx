import React from "react";
import styles from "./slider1.module.scss";
import classNames from "classnames/bind";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/scss";
const cx = classNames.bind(styles);

const data = [
  {
    img: "https://cdn.shopify.com/s/files/1/0548/8554/8183/files/G2_SG_Home_1800x.jpg?v=1657827798",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0548/8554/8183/files/G2_SG_Home_1800x.jpg?v=1657827798",
  },
  {
    img: "https://kenh14cdn.com/2019/12/4/huy2237-15754389912341568430703.jpg",
  },
];

export const Slider1 = () => {
  return (
    <div className={`w-screen h-screen`}>
      <div className="w-full h-1/5"></div>
      <div className="w-full h-4/5 relative">
        {/* <div className="w-full h-full relative">
          <img
            src="https://cdn.shopify.com/s/files/1/0548/8554/8183/files/G2_SG_Home_1800x.jpg?v=1657827798"
            className="w-full h-full object-cover "
            alt=""
          ></img>
        </div>
        <div className="w-3/12 h-2/5 border-2 border-black z-2 right-0 bottom-0 absolute"></div> */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          autoplay={{ delay: 10000 }}
          loop={true}
          className="w-full h-full relative"
        >
          {data.map((item) => {
            return (
              <SwiperSlide>
                <div className="w-full h-full  relative">
                  <img
                    src={item.img}
                    className="w-full h-full object-content "
                    alt=""
                  ></img>
                </div>
                <div
                  slot="container-end"
                  className={`w-3/12 h-2/6 mr-5 mb-5 z-10 right-0 bottom-0 absolute ${cx(
                    "Slider"
                  )}`}
                >
                  <div className="w-full h-full  relative">
                    <img
                      src={item.img}
                      className="w-full h-full object-content "
                      alt=""
                    ></img>
                  </div>
                  <div
                    slot="container-end"
                    className={`bg-black w-3/12 h-full z-20 right-0 bottom-0 absolute ${cx(
                      "Slider__btnNext"
                    )}`}
                  ></div>
                </div>
              </SwiperSlide>
            );
          })}
          {/* <div
            slot="container-end"
            className={`w-3/12 h-2/6 mr-5 mb-5 z-10 right-0 bottom-0 absolute ${cx(
              "Slider"
            )}`}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              autoplay={{ delay: 10000 }}
              loop={true}
              className="w-full h-full"
            >
              {data.map((item1) => {
                return (
                  <div className="w-full h-full ">
                    <SwiperSlide>
                      <div className="w-full h-full  relative">
                        <img
                          src={item1.img}
                          className="w-full h-full object-cover "
                          alt=""
                        ></img>
                      </div>
                    </SwiperSlide>
                  </div>
                );
              })}
              <div
                slot="container-end"
                className={`bg-black w-3/12 h-full z-20 right-0 bottom-0 absolute ${cx(
                  "Slider__btnNext"
                )}`}
              ></div>
            </Swiper>
          </div> */}
        </Swiper>
      </div>
    </div>
  );
};
