//@flow
import React from "react";

import style from "./Tab.module.css";
import { Icon } from "../index";

type PROPS = {
  costs: Object,
  income: Object
};
type STATE = {
  switcher: boolean
};

export class Tab extends React.Component<PROPS, STATE> {
  state = {
    switcher: true
  };
  handleSwtich = () => {
    this.setState({ switcher: !this.state.switcher });
  };
  render() {
    const { switcher } = this.state;
    const { income, costs } = this.props;
    return (
      <div>
        <div className={style.nav} onClick={this.handleSwtich}>
          <button
            className={
              switcher
                ? [style.navBtn, style.navBtnFirst].join(" ")
                : [style.navBtn, style.navBtnSecond].join(" ")
            }
          >
            {switcher ? "доходы" : "расходы"}
          </button>
        </div>
        <div className={style.body}>
          {switcher ? (
            <div className={[style.table].join(" ")}>
              <div className={style.tabRow}>
                <div className={style.tabRowTitle}>
                  <Icon icon={"money-bag"} color={"#B3B3B3"} />
                  <div className={style.titleText}>всего</div>
                </div>
                <div className={style.TabRowValue}>{income.total}₽</div>
              </div>
            </div>
          ) : (
            <div className={[style.tab].join(" ")}>{costs.total}</div>
          )}
        </div>
      </div>
    );
  }
}
