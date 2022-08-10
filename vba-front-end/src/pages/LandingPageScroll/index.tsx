import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./landingPageScroll.module.scss";
import videoG2 from "./../../videos/G2cut.mp4";
import { Power3, gsap, Expo } from "gsap";
import { NavigationBar } from "../../components/NavigationBar";
import { data, DataModel } from "./data";
import { getActiveElement } from "@testing-library/user-event/dist/utils";
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

  //refs
  const collectionContainer = useRef<HTMLDivElement>(null);
  const bgListContainer = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const listExists = () => {
    return (
      (bgListContainer.current &&
        bgListContainer.current.children &&
        bgListContainer.current.children.length > 0) ||
      (collectionContainer.current &&
        collectionContainer.current.children &&
        collectionContainer.current.children.length)
    );
  };

  const elementList = useCallback((): HTMLElement[] | undefined => {
    if (listExists()) {
      return Array.prototype.slice.call(bgListContainer.current?.children);
    }
  }, []);

  const collectionList = useCallback((): HTMLElement[] | undefined => {
    if (listExists()) {
      return Array.prototype.slice.call(collectionContainer.current?.children);
    }
  }, []);

  const initElements = useCallback(() => {
    if (listExists()) {
      elementList()![pageConstants.DEFAULT_INDEX].classList.add("active");
      elementList()![pageConstants.DEFAULT_INDEX].style.zIndex =
        pageConstants.ACTIVE_ZINDEX;
      for (let i = pageConstants.DEFAULT_INDEX + 1; i < length; i++) {
        gsap.to(elementList()![i], {
          duration: 0,
          zIndex: -1,
          autoAlpha: 0,
          translateX: pageConstants.INACTIVE_TRANSLATE,
        });
      }
      collectionList()![pageConstants.DEFAULT_INDEX].classList.add("active");
      collectionList()![pageConstants.DEFAULT_INDEX].style.zIndex =
        pageConstants.ACTIVE_ZINDEX;
      for (let j = pageConstants.DEFAULT_INDEX + 1; j < length; j++) {
        gsap.to(collectionList()![j], {
          duration: 0,
          zIndex: -1,
          scale: 1.4,
          clipPath: pageConstants.POLYGON_INACTIVE,
          autoAlpha: 0,
          translateY: pageConstants.INACTIVE_TRANSLATE,
        });
      }
    }
  }, [length, collectionList, elementList]);

  console.log("75", elementList);

  const tl = gsap.timeline();
  const tl2 = gsap.timeline();

  const selectedColor = () => list[activeIndex]?.color;

  useEffect(() => {
    setList(data);
    setLength(data.length);
    initElements();
  }, [list, length, initElements]);

  const renderBgList = (): JSX.Element[] =>
    list.map((l) => (
      <figure ref={bgImageRef} key={l.id} className={cx("__background-img")}>
        <img
          className="w-full h-full object-cover"
          src={l.url}
          alt="bg img"
        ></img>
      </figure>
    ));

  const renderCollection = (): JSX.Element[] =>
    list.map((l) => (
      <figure key={l.id}>
        <img
          className="w-full h-full object-cover"
          src={l.url}
          alt="collection img"
        ></img>
      </figure>
    ));
  const getActiveElement = () => {
    let activeElementObj = {} as {
      activeEl: HTMLElement;
      index: number;
    };
    elementList()?.forEach((el, index) => {
      if (el && el.classList && el.classList.contains("active")) {
        activeElementObj = {
          ...activeElementObj,
          activeEl: el,
          index,
        };
      }
    });
    return activeElementObj;
  };
  const getActiveElementCollection = () => {
    let activeElementObj = {} as {
      activeElCollection: HTMLElement;
      collectionElementIndex: number;
    };
    collectionList()?.forEach((el, index) => {
      if (el && el.classList && el.classList.contains("active")) {
        activeElementObj = {
          ...activeElementObj,
          activeElCollection: el,
          collectionElementIndex: index,
        };
      }
    });
    return activeElementObj;
  };

  const prev = (): void => {};

  const next = (): void => {
    setDisabled(true);
    const { index, activeEl } = getActiveElement();
    const { collectionElementIndex, activeElCollection } =
      getActiveElementCollection();
    let nextElementSibling = elementList()![index + 1];
    let nextElementCollectionSibling =
      collectionList()![collectionElementIndex + 1];

    activeEl.style.zIndex = pageConstants.ACTIVE_ZINDEX;
    activeElCollection.style.zIndex = pageConstants.ACTIVE_ZINDEX;

    if (index + 1 >= length || collectionElementIndex + 1 >= length) {
      nextElementSibling = elementList()![0];
      nextElementCollectionSibling = collectionList()![0];
      //animate
      animateElement(nextElementSibling, index, true, false);
      animateElement(
        nextElementCollectionSibling,
        collectionElementIndex,
        true,
        false,
        true
      );
    } else {
      //animate
      animateElement(nextElementSibling, index, false, false);
      animateElement(
        nextElementCollectionSibling,
        collectionElementIndex,
        false,
        false,
        true
      );
    }
  };

  const animateElement = (
    elem: HTMLElement,
    index: number,
    final = false,
    isPrev = false,
    isCollection = false
  ): void => {
    if (isCollection) {
      elem.style.clipPath = pageConstants.POLYGON_ACTIVE;
      tl2
        .to(elem, {
          duration: 0,
          autoAlpha: 1,
          zIndex: isPrev
            ? final
              ? pageConstants.ACTIVE_ZINDEX
              : pageConstants.ACTIVE_ZINDEX + 1
            : final
            ? pageConstants.ACTIVE_ZINDEX + 1
            : pageConstants.ACTIVE_ZINDEX,
        })
        .to(elem, {
          translateY: 0,
          scale: 1,
          ease: Expo.easeInOut as any,
          duration: 1.4,
          onComplete: () => {
            if (isPrev) {
            } else {
            }
          },
        });
    } else {
      tl.to(elem, {
        duration: 0,
        autoAlpha: 1,
        zIndex: isPrev
          ? final
            ? pageConstants.ACTIVE_ZINDEX
            : pageConstants.ACTIVE_ZINDEX + 1
          : final
          ? pageConstants.ACTIVE_ZINDEX + 1
          : pageConstants.ACTIVE_ZINDEX,
      }).to(elem, {
        ease: Expo.easeInOut as any,
        duration: 1.4,
        translateX: 0,
        onComplete: () => {
          if (isPrev) {
          } else {
          }
        },
      });
    }
  };

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
              <div className={`${cx("__left")} text-third-color`}>
                <div className="absolute left-1/2 bottom-[10%] text-center">
                  <div className="flex justify-between">
                    <h1 onClick={prev}>previous</h1>
                    <button onClick={next}>next</button>
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
