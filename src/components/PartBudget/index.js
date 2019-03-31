//@flow
import React from "react";

type PROPS = {
  common: number,
  daysToPayday: ?string,
  typeModal: string,
  onClickToggleModal: Function,
  caclcToDay: Function,
  todaysCosts: Object,
  wholeBudget: number,
  vk_id: number
};

type STATE = {
  money: ?number,
  temp: ?number
};

class PartBudget extends React.Component<PROPS, STATE> {
  state = {
    budget: this.props.wholeBudget,
    money: undefined,
    temp: undefined
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.daysToPayday !== this.props.daysToPayday) this.fetcher();
    if (prevProps.common !== this.props.common) this.fetcher();
  }
  componentDidMount() {
    // const dailyCommon = +(this.props.common / +this.props.daysToPayday).toFixed(
    //   2
    // );
    // this.props.caclcToDay(dailyCommon);
    this.fetcher();
  }

  fetcher = () => {
    console.log("FETCHING NEW DATA");
    const data = {
      vk_id: this.props.vk_id,
      budget: this.props.wholeBudget,
      type: "common",
      daysToPayday: this.props.daysToPayday
    };
    fetch("http://127.0.0.1:8000/max-cost-to-day/", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log("11111", res);
        this.setState({ money: res.money, temp: res.temp });
        return res;
      })
      .catch(err => console.log(Error(err)));
  };
  render() {
    const { wholeBudget, onClickToggleModal, typeModal } = this.props;
    const common50 = (wholeBudget * 0.5).toFixed(2);
    // const common50 = +this.state.budget * 0.5;
    // const todaysCosts50 = (common50 / +daysToPayday).toFixed(2);

    return (
      <>
        <h1>50%</h1>
        <div>
          <div>{common50}</div>
          <div>
            {" "}
            на сегодня: {this.state.temp} / <b>{this.state.money}</b>
          </div>
          <div>
            <button onClick={() => onClickToggleModal(`${typeModal}_plus`)}>
              +
            </button>
            <button onClick={() => onClickToggleModal(`${typeModal}_minus`)}>
              -
            </button>
          </div>
        </div>
      </>
    );
  }
}

export { PartBudget };
