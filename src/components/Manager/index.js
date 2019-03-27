//@flow
import React from "react";

import { Card } from "../index";
import { PayDay, Modal, WholeBudget } from "../index";

type PROPS = {
  modalIsVisible: boolean,
  onClickToggleModal: Function,
  typeModal: string
};

class Manager extends React.Component<PROPS, {}> {
  render() {
    const { modalIsVisible, onClickToggleModal, typeModal } = this.props;
    return (
      <>
        <Card headerTitle={"общий бюджет"} icon={"money-bag"}>
          {/* <WholeBudgetContainer /> */}
          <WholeBudget onClick={() => onClickToggleModal("budget")} />
        </Card>
        <Card headerTitle={"календарь"} icon={"calendar"}>
          <PayDay onClick={() => onClickToggleModal("payday")} />
        </Card>
        {!modalIsVisible || (
          <Modal onClick={onClickToggleModal} typeModal={typeModal} />
        )}
      </>
    );
  }
}
export { Manager };
