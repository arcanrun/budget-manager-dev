//@flow
import React from "react";

import style from "./EntranceItem.module.css";
type PROPS = {
  image: string,
  title: string,
  text: string
};

export const EntranceItem = ({ image, title, text }: PROPS) => (
  <div className={style.entranceItem}>
    <div className={style.imageBlock}>
      <div className={style.imageBgText}>50</div>
      <div className={style.image}>{image}</div>
    </div>

    <div className={style.title}>{title}</div>
    <div className={style.text}>{text}</div>
    <div className={style.footer} />
  </div>
);
