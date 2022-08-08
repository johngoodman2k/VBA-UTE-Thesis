import React from "react";
import classNames from "classnames/bind";
import styles from "./landingPage.module.scss";
import { NavigationBar } from "../../components/NavigationBar";
const cx = classNames.bind(styles);
export const LandingPage = () => {
  return (
    <div className="w-full overflow-hidden">
      <NavigationBar></NavigationBar>
      <div className={cx("__content")}>
        <div>
          <div className="mt-0 mb-0 relative w-full h-full block overflow-visible ">
            <div className={cx("__wrapper")}>
              {/* <div className="relative h-full xl:bg-shadow-layer "></div> */}

              <div className="absolute  block top-[60%] left-[40%] text-third-color ">
                <div className={cx("__wrapper__content")}>
                  <span className="block">we are</span>
                  <span>VBA</span>
                  {/* <br>VBA</br> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>3e2111111111111</div>
        <div>3e2111111111111</div>
        <div>3e2111111111111</div>
      </div>
    </div>
  );
};
