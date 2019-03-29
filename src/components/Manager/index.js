//@flow
import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import "./style.css";
import { Card, Spinner } from "../index";
import { PayDay, Modal, WholeBudget } from "../index";
const date = new Date();

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
  handleNewPayDay = e => {
    const btnType = e.target.dataset.btnType;
    const { tempPayDay } = this.state;

    switch (btnType) {
      case "ok":
        this.props.addPayDay(tempPayDay.toLocaleDateString());
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
        <Card
          headerTitle={"календарь"}
          icon={"calendar"}
          rightIcon={"pencil"}
          onClick={() => onClickToggleModal("payday")}
        >
          <DayPicker
            showOutsideDays
            todayButton="Сегодня"
            onDayClick={this.handleDayClick}
            selectedDays={this.state.tempPayDay}
          />
          <div className="pickle__footer">
            {payday_isFetching ? (
              <Spinner />
            ) : !payday && !tempPayDay ? (
              "Выбирите дату получения зарплаты"
            ) : !tempPayDay ? (
              <div className="pickle__counter">
                <span>N</span>
                <span>Дней до зарплаты</span>
              </div>
            ) : (
              <div>
                Дата получения зарплаты
                <br />
                <b>{tempPayDay.toLocaleDateString()}</b>
                <div
                  className="pickle__control-btns"
                  onClick={this.handleNewPayDay}
                >
                  <button data-btn-type="ok">ok</button>
                  {"    "}
                  <button data-btn-type="chanel">cancel</button>
                </div>
              </div>
            )}
          </div>
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
