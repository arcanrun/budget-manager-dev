//@flow
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  PanelHeader,
  HeaderButton,
  FormLayoutGroup,
  List,
  Radio,
  platform,
  IOS
} from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";

import { CURRENCIES } from "./helpers";

type PROPS = {
  goBack: () => void,
  handleCurrencyClick: () => void,
  selectedCurrency: ?string
};
export const CurrencyView = ({
  goBack,
  handleCurrencyClick,
  selectedCurrency
}: PROPS) => {
  const [osname, setOsname] = useState(platform());

  useEffect(() => {
    setOsname(platform());
  });
  return (
    <>
      <PanelHeader
        addon={<HeaderButton onClick={goBack}>Назад</HeaderButton>}
        left={
          <HeaderButton onClick={goBack}>
            {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </HeaderButton>
        }
      >
        Валюта
      </PanelHeader>

      <FormLayoutGroup onClick={handleCurrencyClick}>
        <List>
          {CURRENCIES.map((e, i) => {
            return (
              <Radio
                key={i}
                name="currency"
                value={e}
                defaultChecked={selectedCurrency === e ? true : false}
              >
                {e}
              </Radio>
            );
          })}
        </List>
      </FormLayoutGroup>
    </>
  );
};
