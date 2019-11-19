//@flow
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

export const SettingsPage = () => {
  const [isIn, setIn] = useState(false);
  useEffect(() => {
    setIn(true);
  });

  return (
    <CSSTransition in={isIn} timeout={300} classNames={"page"}>
      <div>THIS WILL BE SETTINGS PAGES</div>
    </CSSTransition>
  );
};
