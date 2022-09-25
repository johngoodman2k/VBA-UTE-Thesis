import React, { useState, useEffect } from "react";
import styles from "./modalAddTeam.module.scss";
import classNames from "classnames/bind";
import { ModalBlock } from "../ModalBlock";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const cx = classNames.bind(styles);
const ModalAddTeam = () => {
  const [fileDataURL, setFileDataURL] = useState<any>(null);
  const [file, setFile] = useState(null);

  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) return;
    setFile(file);
  };
  useEffect(() => {
    let isCancel = false;
    let fileReader = new FileReader();

    if (file) {
      fileReader.onload = (e: ProgressEvent<FileReader> | null) => {
        if (e && e.target) {
          const { result } = e.target;
          if (e.target.result && !isCancel) {
            setFileDataURL(result);
          }
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <ModalBlock>
      <div className={cx("ModalTitle")}>Add Player</div>
      <div className="flex flex-row">
        <div className="basis-3/6 flex flex-wrap">
          <div className="basis-1/2">
            <div className={cx("TitleTop")}>First Name</div>
            <input type="text" className={cx("Input", "Input__Top")}></input>
          </div>

          <div className="basis-1/2">
            <div className={cx("TitleTop")}>Last Name</div>
            <input type="text" className={cx("Input", "Input__Top")}></input>
          </div>

          <div className="basis-1/2 mt-1.5">
            <div className={cx("TitleTop")}>Day of Birth</div>
            <input type="text" className={cx("Input", "Input__Top")}></input>
          </div>

          <div className="basis-1/2 mt-1.5">
            <div className={cx("TitleTop")}>Shirt Number</div>
            <input type="text" className={cx("Input", "Input__Top")}></input>
          </div>
          <div className="basis-full mt-1.5">
            <div className={cx("TitleTop")}>Country</div>
            <input
              type="text"
              className={cx("Input", "Input__Top", "Input__Top--oneobject")}
            ></input>
          </div>
        </div>

        <div className="basis-1/6 flex flex-col">
          <div className="h-auto w-full">
            <div className={cx("TitleTop")}>Weight</div>
            <input
              type="text"
              className={cx("Input", "Input__Top", "Input__Top--oneobject")}
            ></input>
          </div>
          <div className="h-auto w-full mt-1.5">
            <div className={cx("TitleTop")}>Height</div>
            <input
              type="text"
              className={cx("Input", "Input__Top", "Input__Top--oneobject")}
            ></input>
          </div>
        </div>

        <div className="basis-2/6 flex flex-col ">
          <div className={cx("TitleTop")}>Image</div>

          <div className="flex flex-col relative mt-4 h-full w-full rounded-md">
            <div className="w-full h-full bg-white rounded-md">
              <div className="w-full h-[162px]">
                <img
                  src={
                    fileDataURL === null
                      ? "https://th.bing.com/th/id/OIP.uQ03KuU1Jb_7HNs_We8__wAAAA?pid=ImgDet&rs=1"
                      : fileDataURL
                  }
                  alt="playerImage"
                  className={cx("Input__Preview__Image")}
                ></img>
              </div>
            </div>
            <div className={cx("ImageUploadWrap")}>
              <label className={cx("Input__ButtonLabel")} htmlFor="upload">
                Upload image
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={onChangeImage}
                className={cx("Input", "Input__Image")}
              ></input>
              <div
                className={cx("Input__Preview", "Input__Preview__TextBlock")}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("ModalFooter")}>
        <button className={cx("ModalFooter__ButtonBlock")}>ADD</button>
        <button className={cx("ModalFooter__ButtonBlock")}>Cancel</button>
      </div>
      {/* <div className="basis-1/2 mt-1.5">
            <div className={cx("TitleTop")}>Weight</div>
            <input type="text" className={cx("InputTop")}></input>
          </div>

          <div className="basis-1/2 mt-1.5">
            <div className={cx("TitleTop")}>Height</div>
            <input type="text" className={cx("InputTop")}></input>
          </div> */}
    </ModalBlock>
  );
};

export default ModalAddTeam;
