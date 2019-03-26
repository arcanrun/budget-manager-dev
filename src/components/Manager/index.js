//@flow
import React from "react";

import { Card } from "../index";
import { WholeBudgetContainer } from "../../containers";
import { PayDay, Modal } from "../index";

class Manager extends React.Component<{}, {}> {
  state = {
    modelIsVisible: false
  };
  render() {
    return (
      <>
        <Card headerTitle={"общий бюджет"} icon={"money-bag"}>
          <WholeBudgetContainer />
        </Card>
        <Card headerTitle={"календарь"} icon={"calendar"}>
          <PayDay />
        </Card>
        {!this.state.modelIsVisible || <Modal />}
      </>
    );
  }
}
export { Manager };
