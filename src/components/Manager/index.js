//@flow
import React from "react";

import { Card } from "../index";
import { Modal, WholeBudget, Calendar, Spinner } from "../index";

type PROPS = {
  getWholeBudget: Function,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  getPayDay: Function,
  typeModal: string,
  wholeBudget: number,
  payday: string,
  wholeBudget_isFetching: boolean,
  payday_isFetching: boolean,
  modalIsVisible: boolean
};

type STATE = {
  tempPayDay: ?string
};

class Manager extends React.Component<PROPS, STATE> {
  state = {
    tempPayDay: undefined
  };
  componentDidMount() {
    if (!this.props.wholeBudget) this.props.getWholeBudget();
    if (!this.props.payday) this.props.getPayDay();
  }
  handleDayClick = (day: string, { selected }: { selected: boolean }) => {
    this.setState({
      tempPayDay: selected ? undefined : day
    });
  };
  handleNewPayDay = (e: any) => {
    const btnType = e.target.dataset.btnType;
    const { tempPayDay } = this.state;

    switch (btnType) {
      case "ok":
        this.props.addPayDay(tempPayDay);
        this.setState({ tempPayDay: undefined });
        break;
      case "chanel":
        this.setState({ tempPayDay: undefined });
        break;
      default:
        console.log("hmm...");
        this.setState({ tempPayDay: undefined });
    }
  };
  render() {
    const {
      modalIsVisible,
      onClickToggleModal,
      typeModal,
      wholeBudget,
      payday,
      wholeBudget_isFetching,
      payday_isFetching
    } = this.props;
    const { tempPayDay } = this.state;
    return (
      <>
        <Card
          headerTitle={"общий бюджет"}
          icon={"money-bag"}
          rightIcon={"pencil"}
          onClick={() => onClickToggleModal("budget")}
        >
          <WholeBudget
            onClick={() => onClickToggleModal("budget")}
            wholeBudget={wholeBudget}
            isFetching={wholeBudget_isFetching}
          />
        </Card>
        <Card headerTitle={"календарь"} icon={"calendar"}>
          {/* {payday_isFetching ? (
            <Spinner />
          ) : ( */}
          <Calendar
            handleDayClick={this.handleDayClick}
            handleNewPayDay={this.handleNewPayDay}
            payday_isFetching={payday_isFetching}
            tempPayDay={tempPayDay}
            payday={payday}
          />
        </Card>
        {!modalIsVisible || (
          <Modal
            onClick={onClickToggleModal}
            typeModal={typeModal}
            {...this.props}
          />
        )}
      </>
    );
  }
}
export { Manager };
