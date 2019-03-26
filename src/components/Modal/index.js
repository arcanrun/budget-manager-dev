//@flow

import React from "react";
import ReactDOM from "react-dom";

import "./style.css";
import { Card } from "../index";

const Modal = () =>
  ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__card">
        <div className="modal__title">Заголовок</div>
        <input className="modal__card-input" type="text" />
        <div className="modal__card-btns-block">
          <button>отмена</button>
          <button>ок</button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );

export { Modal };
