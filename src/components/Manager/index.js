//@flow
import React from "react";

import { Card } from "../index";
import { PayDay, Modal, WholeBudget } from "../index";
import { addWholeBudget } from "../../actions";

type PROPS = {
  modalIsVisible: boolean,
  onClickToggleModal: Function,
  addWholeBudget: Function,
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
