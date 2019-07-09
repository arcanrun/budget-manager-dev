//@flow
import React from "react";

import style from "./Tab.module.css";
import { Icon, LineChart } from "../index";
import { ShortenNumber } from "../index";

type PROPS = {
  costs: Object,
  income: Object,
  history: Array<any>
};
type STATE = {
  switcher: boolean
};

export class Tab extends React.Component<PROPS, STATE> {
  state = {
    switcher: true
  };
  handleSwtich = () => {
    console.log("toggling swithcet");
    this.setState({ switcher: !this.state.switcher });
  };
  render() {
    const { switcher } = this.state;
    const { income, costs, history } = this.props;
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
                  <Icon icon={"money-bag"} color={"#B3B3B3"} fontSize={"9px"} />
                  <div className={style.titleText}>всего</div>
                </div>
                <div
                  className={[style.TabRowValue, style.colorFirst].join(" ")}
                >
                  <ShortenNumber alternative={true} curency={true}>
                    {income.total}
                  </ShortenNumber>
                </div>
              </div>
              <div className={style.tabRow}>
                <div className={style.tabRowTitle}>
                  <Icon icon={"50%"} color={"#B3B3B3"} fontSize={"9px"} />
                  <div className={style.titleText}>ОБЩИЕ СРЕДСТВА</div>
                </div>
                <div
                  className={[style.TabRowValue, style.colorFirst].join(" ")}
                >
                  <ShortenNumber alternative={true} curency={true}>
                    {income.common}
                  </ShortenNumber>
                </div>
              </div>
              <div className={style.tabRow}>
                <div className={style.tabRowTitle}>
                  <Icon icon={"30%"} color={"#B3B3B3"} fontSize={"9px"} />
                  <div className={style.titleText}>РАЗВЛЕЧЕНИЯ</div>
                </div>
                <div
                  className={[style.TabRowValue, style.colorFirst].join(" ")}
                >
                  <ShortenNumber alternative={true} curency={true}>
                    {income.fun}
                  </ShortenNumber>
                </div>
              </div>
              <div className={style.tabRow}>
                <div className={style.tabRowTitle}>
                  <Icon icon={"20%"} color={"#B3B3B3"} fontSize={"9px"} />
                  <div className={style.titleText}>ИНВЕСТИЦИИ</div>
                </div>
                <div
                  className={[style.TabRowValue, style.colorFirst].join(" ")}
                >
                  <ShortenNumber alternative={true} curency={true}>
                    {income.invest}
                  </ShortenNumber>
                </div>
              </div>
            </div>
          ) : (
            <div className={[style.table].join(" ")}>
              <div className={style.tabRow}>
                <div className={style.tabRowTitle}>
                  <Icon icon={"money-bag"} color={"#B3B3B3"} fontSize={"9px"} />
                  <div className={style.titleText}>всего</div>
                </div>
                <div
                  className={[style.TabRowValue, style.colorSecond].join(" ")}
                >
                  <ShortenNumber alternative={true} curency={true}>
                    {costs.total}
                  </ShortenNumber>
                </div>
              </div>
              <div className={style.tabRow}>
                <div className={style.tabRowTitle}>
                  <Icon icon={"50%"} color={"#B3B3B3"} fontSize={"9px"} />
                  <div className={style.titleText}>ОБЩИЕ СРЕДСТВА</div>
                </div>
                <div
                  className={[style.TabRowValue, style.colorSecond].join(" ")}
                >
                  <ShortenNumber alternative={true} curency={true}>
                    {costs.common}
                  </ShortenNumber>
                </div>
              </div>
              <div className={style.tabRow}>
                <div className={style.tabRowTitle}>
                  <Icon icon={"30%"} color={"#B3B3B3"} fontSize={"9px"} />
                  <div className={style.titleText}>РАЗВЛЕЧЕНИЯ</div>
                </div>
                <div
                  className={[style.TabRowValue, style.colorSecond].join(" ")}
                >
                  <ShortenNumber alternative={true} curency={true}>
                    {costs.fun}
                  </ShortenNumber>
                </div>
              </div>
              <div className={style.tabRow}>
                <div className={style.tabRowTitle}>
                  <Icon icon={"20%"} color={"#B3B3B3"} fontSize={"9px"} />
                  <div className={style.titleText}>ИНВЕСТИЦИИ</div>
                </div>
                <div
                  className={[style.TabRowValue, style.colorSecond].join(" ")}
                >
                  <ShortenNumber alternative={true} curency={true}>
                    {costs.invest}
                  </ShortenNumber>
                </div>
              </div>
            </div>
          )}
        </div>
        <LineChart switcher={switcher} history={history} />
      </div>
    );
  }
}
