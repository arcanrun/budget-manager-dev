//@flow
import React from "react";

import style from "./EntranceItem.module.css";
import { Icon } from "../index";

type PROPS = {
  image: string,
  title: string,
  text: string,
  bgText?: string,
  imgHeight?: string,
  imgWidth?: string,
  btnLogin?: React.Node
};

export const EntranceItem = ({
  image,
  title,
  text,
  bgText,
  imgHeight,
  imgWidth,
  btnLogin
}: PROPS) => {
  return (
    <div className={style.entranceItem}>
      <div className={style.wrapper}>
        <div className={style.imageBlock}>
          <div className={style.imageBgText}>{bgText}</div>
          <div className={style.image}>
            <Icon icon={image} width={imgWidth} height={imgHeight} />
          </div>
        </div>

        <div className={style.title}>{title}</div>
        <div className={style.text}>{text}</div>
        {btnLogin ? <div className={style.footer}>{btnLogin}</div> : ""}
      </div>
    </div>
  );
};
