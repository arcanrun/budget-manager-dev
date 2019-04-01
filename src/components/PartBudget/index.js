//@flow
import React from "react";

type PROPS = {
  daysToPayday: ?string,
  typeModal: string,
  onClickToggleModal: Function,
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
    if (prevProps.wholeBudget !== this.props.wholeBudget) this.fetcher();
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
    fetch("http://127.0.0.1:8000/max-cost-to-day/2", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log("PartBudget:", res);
        this.setState({ money: res.money, temp: res.temp });
        return res;
      })
      .catch(err => console.log(Error(err)));
  };
  render() {
    const { wholeBudget, onClickToggleModal, typeModal } = this.props;
    let title = "";
    let costs = "";
    if (typeModal === "common") {
      title = "50";
      costs = (wholeBudget * 0.5).toFixed(2);
    } else if (typeModal === "fun") {
      title = "30";
      costs = (wholeBudget * 0.3).toFixed(2);
    }

    return (
      <>
        <h1>{title}</h1>
        <div>
          <div>{costs}</div>
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
