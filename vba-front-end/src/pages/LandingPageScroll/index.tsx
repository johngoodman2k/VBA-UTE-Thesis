import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./landingPageScroll.module.scss";
import videoG2 from "./../../videos/G2cut.mp4";
import { Power3, gsap, Expo } from "gsap";
import { NavigationBar } from "../../components/NavigationBar";
import { data, DataModel } from "./data";
const cx = classNames.bind(styles);

const pageConstants = {
  DEFAULT_INDEX: 0,
  ACTIVE_ZINDEX: "500",
  INACTIVE_TRANSLATE: "100%",
  POLYGON_INACTIVE: "polygon(0 76%,100% 89%,100% 100%,0% 100%)",
  POLYGON_ACTIVE: "polygon(0 0,100% 0,100% 100%,0% 100%)",
};

export const LandingPageScroll = () => {
  let title = useRef(null);
  let header = useRef(null);
  console.log("header", header);
  useEffect(() => {
    console.log(title);
    gsap
      .to(title, {
        duration: 2,
        opacity: 1,
        y: -20,
        x: 300,
        ease: Power3.easeOut,
        // delay: 9000,
      })
      .delay(9);
    gsap
      .to(header, {
        duration: 2,
        opacity: 1,
        y: 50,

        ease: Power3.easeOut,
        // delay: 9000,
      })
      .delay(9);
  }, []);

  const [list, setList] = useState<DataModel[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(
    pageConstants.DEFAULT_INDEX
  );
  const [length, setLength] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const tl = gsap.timeline();
  const tl2 = gsap.timeline();

  useEffect(() => {
    setList(data);
    setLength(data.length);
  }, [list, length]);

  const renderBgList = (): JSX.Element[] =>
    list.map((l) => (
      <figure key={l.id} className={cx("__background-img")}>
        <img src={l.url} alt="bg img"></img>
      </figure>
    ));

  const renderCollection = (): JSX.Element[] =>
    list.map((l) => (
      <figure key={l.id}>
        <img src={l.url} alt="collection img"></img>
      </figure>
    ));
  return (
    <>
      <div className={`w-full overflow-hidden ${cx("__wrapper")}`}>
        <section>
          <div
            className={`relative ${cx("__header__block")}`}
            ref={(el: any) => {
              header = el;
            }}
          >
            <NavigationBar />
          </div>

          <div className={cx("__intro")}>
            <video src={videoG2} autoPlay muted></video>
            <div className={`${cx("__hero")}`}>
              <div className={`${cx("__left ")}`}>
                {/* <h1
                  ref={(el: any) => {
                    title = el;
                  }}
                  className={cx("__title")}
                >
                  WE ARE
                  <div className="text-third-color">VBA</div>
                </h1> */}

                <div className="w-full h-full relative m-auto text-center text-third-color align-middle ">
                  <div className="absolute top-[40%] left-1/2">
                    <div className="flex justify-between">
                      <h1>previous</h1>
                      <h1>next</h1>
                    </div>
                    <h1 className={`${cx("__left__title")}`}>
                      WE ARE <br></br>
                      <span className="text-third-color">VBA</span>
                    </h1>
                    <div className={`${cx("__left__book")}`}>
                      {renderCollection()}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div> Next</div>
            <div>Previous</div> */}
              <div className={cx("__right")}>
                <div className={cx("__right__wrapper")}>{renderBgList()}</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <img
            className="w-full h-full  object-cover"
            src="https://i.ytimg.com/vi/aQPHjwiZ5oM/maxresdefault.jpg"
            alt=""
          />
        </section>
        <section className="bg-red-100">
          <h1>Third Page</h1>
        </section>
        <section className="bg-amber-500">
          <h1>Fourth Page</h1>
        </section>
        <section>
          <h1>Fifth Page</h1>
        </section>
      </div>
    </>
  );
};
