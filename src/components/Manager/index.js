//@flow
import React from "react";

import { Card } from "../index";
import { WholeBudgetContainer } from "../../containers";
import { PayDay } from "../PayDay";

const Manager = () => (
  <>
    <Card headerTitle={"общий бюджет"} icon={"money-bag"}>
      <WholeBudgetContainer />
    </Card>
    <Card headerTitle={"календарь"} icon={"calendar"}>
      <PayDay />
    </Card>
  </>
);

export { Manager };
