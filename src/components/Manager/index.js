//@flow
import React from "react";

import { Card } from "../index";
import { PayDay, Modal, WholeBudget } from "../index";
import { addPayDay } from "../../actions";

type PROPS = {
  modalIsVisible: boolean,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  typeModal: string,
  wholeBudget: number,
  payday: string,
  wholeBudget_isFetching: boolean,
  payday_isFetching: boolean
};

class Manager extends React.Component<PROPS, {}> {
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
    return (
      <>
        <Card headerTitle={"общий бюджет"} icon={"money-bag"}>
          <WholeBudget
            onClick={() => onClickToggleModal("budget")}
            wholeBudget={wholeBudget}
            isFetching={wholeBudget_isFetching}
          />
        </Card>
        <Card headerTitle={"календарь"} icon={"calendar"}>
          <PayDay
            onClick={() => onClickToggleModal("payday")}
            isFetching={payday_isFetching}
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
