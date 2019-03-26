//@flow
import React from "react";

import { Card } from "../index";
import { PayDay, Modal, WholeBudget } from "../index";

type PROPS = {
  modalIsVisible: boolean,
  onClickToggleModal: Function
};

class Manager extends React.Component<PROPS, {}> {
  render() {
    const { modalIsVisible, onClickToggleModal } = this.props;
    return (
      <>
        <Card headerTitle={"общий бюджет"} icon={"money-bag"}>
          {/* <WholeBudgetContainer /> */}
          <WholeBudget onClick={onClickToggleModal} />
        </Card>
        <Card headerTitle={"календарь"} icon={"calendar"}>
          <PayDay />
        </Card>
        {!modalIsVisible || <Modal onClick={onClickToggleModal} />}
      </>
    );
  }
}
export { Manager };
