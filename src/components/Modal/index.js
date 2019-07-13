//@flow
import React from "react";
import {
  ModalPage,
  ModalRoot,
  ModalPageHeader,
  HeaderButton,
  FormLayoutGroup,
  FormLayout,
  Input,
  FormStatus
} from "@vkontakte/vkui";
import { IS_PLATFORM_IOS, IS_PLATFORM_ANDROID } from "@vkontakte/vkui";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";

import "@vkontakte/vkui/dist/vkui.css";

type PROPS = {
  hideModal: Function,
  calcBudget: Function,
  addWholeBudget: Function,
  calcTempCosts: Function,
  typeModal: string,
  daysToPayday: string,
  vk_id: string
};
type STATE = {
  isErrorInput: boolean,
  inputValue?: string,
  transferTo: ?string
};
export class Modal extends React.Component<PROPS, STATE> {
  state = {
    isErrorInput: false,
    inputValue: undefined,
    transferTo: undefined
  };
  isVaild = (val: string) => {
    const valToNumber = +val;
    if (valToNumber <= 0) {
      return false;
    } else if (isNaN(val)) {
      return false;
    }
    return true;
  };
  onChange = (e: Object) => {
    const { value } = e.currentTarget;
    if (this.isVaild(value)) {
      this.setState({ isErrorInput: false, inputValue: value });
    } else {
      this.setState({ isErrorInput: true, inputValue: value });
    }
  };
  onClose = () => {
    this.setState({ isErrorInput: false });
    this.props.hideModal();
  };
  handleSending = () => {
    const { inputValue, isErrorInput } = this.state;
    const {
      typeModal,
      daysToPayday,
      addWholeBudget,
      vk_id,
      hideModal,
      calcTempCosts
    } = this.props;
    const [typeModalonly, operation] = typeModal.split("_");
    const dateNow = new Date().toLocaleDateString();
    if (!isErrorInput) {
      hideModal();
      switch (typeModalonly) {
        case "budget":
          if (operation) {
            this.props.calcBudget(
              inputValue,
              this.props.vk_id,
              typeModalonly,
              operation,
              dateNow
            );
            break;
          }
          const type = daysToPayday ? "change" : "add";
          console.log("handleOK[ModalOverlay]:", operation);
          addWholeBudget(vk_id, inputValue, type, daysToPayday);
          break;
        case "common":
        case "fun":
        case "invest":
          calcTempCosts(
            inputValue,
            this.props.vk_id,
            typeModalonly,
            operation,
            dateNow,
            this.state.transferTo
          );
          break;
        default:
          console.warn(
            `[MISSING DISPATCHER FOR TYPE]: ${typeModal} [AND OPERTAION]: ${operation}`
          );
          break;
      }
    }
  };

  render() {
    const { typeModal } = this.props;
    let headerTitle = "";
    let placeholder = "";
    let bottomWarning = "";
    switch (typeModal) {
      case "budget_minus":
        headerTitle = "Расход - Бюджет";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case "budget_plus":
        headerTitle = "Доход - Бюджет";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case "budget":
        headerTitle = "Корректировка - Бюджет";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case "common_minus":
        headerTitle = "Расход - 50%";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case "common_plus":
        headerTitle = "Доход - 50%";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case "fun_plus":
        headerTitle = "Доход - 30%";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case "fun_minus":
        headerTitle = "Расход - 30%";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case "invest_minus":
        headerTitle = "Расход - 20%";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case "invest_plus":
        headerTitle = "Доход - 20%";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case null:
        break;
      default:
        console.warn(`[Unknown type of modal]: ${typeModal}`);
        break;
    }

    const header = (
      <ModalPageHeader
        left={
          <>
            {IS_PLATFORM_ANDROID && (
              <HeaderButton onClick={this.onClose}>
                <Icon24Cancel />
              </HeaderButton>
            )}
            {IS_PLATFORM_IOS && (
              <HeaderButton onClick={this.handleSending}>
                <Icon24Done />
              </HeaderButton>
            )}
          </>
        }
        right={
          <>
            {IS_PLATFORM_ANDROID && (
              <HeaderButton onClick={this.handleSending}>
                <Icon24Done />
              </HeaderButton>
            )}
            {IS_PLATFORM_IOS && (
              <HeaderButton onClick={this.onClose}>
                <Icon24Dismiss />
              </HeaderButton>
            )}
          </>
        }
      >
        {headerTitle}
      </ModalPageHeader>
    );

    const { isErrorInput } = this.state;

    return (
      <ModalRoot activeModal={typeModal}>
        <ModalPage id={"budget_minus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
          </FormLayout>
        </ModalPage>
        <ModalPage id={"budget_plus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
          </FormLayout>
        </ModalPage>
        <ModalPage id={"budget"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
          </FormLayout>
        </ModalPage>
        <ModalPage id={"common_minus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
          </FormLayout>
        </ModalPage>
        <ModalPage id={"common_plus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
          </FormLayout>
        </ModalPage>
        <ModalPage id={"fun_plus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
          </FormLayout>
        </ModalPage>
        <ModalPage id={"fun_minus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
          </FormLayout>
        </ModalPage>
        <ModalPage id={"invest_plus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
          </FormLayout>
        </ModalPage>
        <ModalPage id={"invest_minus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
          </FormLayout>
        </ModalPage>
      </ModalRoot>
    );
  }
}
