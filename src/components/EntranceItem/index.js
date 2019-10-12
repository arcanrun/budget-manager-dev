//@flow
import React from "react";

import style from "./EntranceItem.module.css";
import { Icon, Spinner } from "../index";

type PROPS = {
  image: string,
  title: string,
  text: string,
  bgText?: string,
  imgHeight?: string,
  imgWidth?: string,
  btnLogin?: React.Node,
  isMinWidth: boolean,
  isMinHeight: boolean,
  isFetching?: boolean,
  error?: boolean
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
  isMinHeight,
  isFetching,
  error
}: PROPS) => {
  const imageBlock = (
    <div className={style.imageBlock}>
      <div className={style.imageBgText}>{bgText}</div>
      <div className={style.image}>
        <Icon icon={image} width={imgWidth} height={imgHeight} />
      </div>
    </div>
  );
  const footer = (
    <div className={style.footer}>
      {isFetching ? (
        <Spinner size={"m"} />
      ) : (
        <div style={{ marginTop: "50px" }}>{btnLogin}</div>
      )}
    </div>
  );
  const errorBlock = (
    <div>
      <h1>Ошибка подключения к сети</h1>
      <p>Проверьте соединение и повторите попытку</p>
    </div>
  );
  const mainBlock = (
    <div className={style.wrapper}>
      {isMinWidth || isMinHeight ? "" : imageBlock}
      <div className={style.title}>{title}</div>
      <div className={style.text}>{text}</div>
      {btnLogin ? footer : ""}
    </div>
  );

  return (
    <div className={style.entranceItem}>{error ? errorBlock : mainBlock}</div>
  );
};
