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
  imgWidth?: string
};

export const EntranceItem = ({
  image,
  title,
  text,
  bgText,
  imgHeight,
  imgWidth
}: PROPS) => (
  <div className={style.entranceItem}>
    <div className={style.imageBlock}>
      <div className={style.imageBgText}>{bgText}</div>
      <div className={style.image}>
        <Icon icon={image} width={imgWidth} height={imgHeight} />
      </div>
    </div>

    <div className={style.title}>{title}</div>
    <div className={style.text}>{text}</div>
    <div className={style.footer} />
  </div>
);
