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
  btnLogin?: React.Node,
  isMinWidth: boolean,
  isMinHeight: boolean
};

export const EntranceItem = ({
  image,
  title,
  text,
  bgText,
  imgHeight,
  imgWidth,
  btnLogin,
  isMinWidth,
  isMinHeight
}: PROPS) => {
  const imageBlock = (
    <div className={style.imageBlock}>
      <div className={style.imageBgText}>{bgText}</div>
      <div className={style.image}>
        <Icon icon={image} width={imgWidth} height={imgHeight} />
      </div>
    </div>
  );
  return (
    <div className={style.entranceItem}>
      <div className={style.wrapper}>
        {isMinWidth || isMinHeight ? "" : imageBlock}
        <div className={style.title}>{title}</div>
        <div className={style.text}>{text}</div>
        {btnLogin ? <div className={style.footer}>{btnLogin}</div> : ""}
      </div>
    </div>
  );
};
