//@flow
import React from "react";
import "./style.css";

type Props = {
  avatar: string,
  onClick: () => mixed,
  menuIsVisible: boolean
};

export const Menu = ({ avatar, onClick, menuIsVisible }: Props) => (
  <div className={menuIsVisible ? "menu" : "menu menu_visible_false"}>
    <i
      className="close-btn"
      style={{
        position: "absolute",
        top: "10px",
        left: "20px",
        cursor: "pointer"
      }}
      onClick={onClick}
    />
    <div className="menu__user-block">
      <img src={avatar} alt="avatar" />
      <h2 className="menu__user-name">Павел дуров</h2>
    </div>
    <div className="menu__items">
      <ul>
        <li>
          <i className="money-beg-icon" />
          50/30/20
        </li>
        <li>
          <i className="history-icon" />
          история
        </li>
      </ul>
    </div>
  </div>
);
