//@flow
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Panel,
  PanelHeaderClose,
  PanelHeader,
  HeaderButton,
  platform,
  IOS
} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

import DayPicker from "react-day-picker";
import {
  MONTHS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
  FIRST_DAY_OF_WEEK,
  LABELS
} from "./helpers";
import { stringToDate } from "../../../Calendar/calendarHelper";

type PROPS = {
  onTodayButtonClick: () => void,
  onDayClick: () => void,
  goBack: () => void,
  selectedPayDay: ?string
};

export const CalendarView = ({
  onTodayButtonClick,
  onDayClick,
  goBack,
  selectedPayDay
}: PROPS) => {
    //todo: useCostumHook
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
        Календарь
      </PanelHeader>
      <DayPicker
        locale={"ru"}
        months={MONTHS["ru"]}
        weekdaysLong={WEEKDAYS_LONG["ru"]}
        weekdaysShort={WEEKDAYS_SHORT["ru"]}
        firstDayOfWeek={FIRST_DAY_OF_WEEK["ru"]}
        labels={LABELS["ru"]}
        todayButton={"сегодня"}
        onTodayButtonClick={onTodayButtonClick}
        onDayClick={onDayClick}
        selectedDays={[stringToDate(selectedPayDay)]}
        disabledDays={[{ before: new Date() }]}
      />
    </>
  );
};
