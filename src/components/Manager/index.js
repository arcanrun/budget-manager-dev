//@flow
import React from "react";

import { Card } from "../index";
import { WholeBudgetContainer } from "../../containers";

const Manager = () => (
  <Card headerTitle={"общий бюджет"} icon={"money-bag"}>
    <WholeBudgetContainer />
  </Card>
);

export { Manager };
