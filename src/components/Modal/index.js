//@flow
import React from "react";
import {
  ModalPage,
  ModalRoot,
  ModalPageHeader,
  HeaderButton,
  FormLayout,
  FormLayoutGroup,
  Input,
  Radio
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
  vk_id: string,
  common: ?number,
  fun: ?number,
  invest: ?number
};
type STATE = {
  isErrorInput: boolean,
  inputValue?: string,
  transferTo: ?string,
  errorExplain: ?string
};
export class Modal extends React.Component<PROPS, STATE> {
  constructor(props: Object) {
    super(props);
    const { typeModal } = this.props;

    this.state = {
      isErrorInput: false,
      inputValue: undefined,
      transferTo: undefined,
      errorExplain: undefined
    };
  }

  isVaild = (value: ?string) => {
    const { common, fun, invest } = this.props;
    const [typeModal, operation] = this.props.typeModal.split("_");
    const isTransfer = operation === "transfer";
    const valToNumber = +value;
    const valToStr = "" + value;

    if (valToNumber <= 0) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (isNaN(value)) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (valToNumber === undefined) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (valToStr.includes("e")) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (valToNumber >= 999e9) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Слишком большое число"
      });
      return false;
    } else if (isTransfer) {
      switch (typeModal) {
        case "common":
          if (valToNumber > common) {
            this.setState({
              isErrorInput: true,
              inputValue: valToStr,
              errorExplain: `Больше допустимой суммы: ${common} ₽`
            });
            return false;
          }
          break;
        case "fun":
          if (valToNumber > fun) {
            this.setState({
              isErrorInput: true,
              inputValue: valToStr,
              errorExplain: `Больше допустимой суммы: ${fun} ₽`
            });
            return false;
          }
          break;
        case "invest":
          if (valToNumber > invest) {
            this.setState({
              isErrorInput: true,
              inputValue: valToStr,
              errorExplain: `Больше допустимой суммы: ${invest} ₽`
            });
            return false;
          }
          break;

        default:
          break;
      }
    }
    this.setState({
      isErrorInput: false,
      errorExplain: undefined,
      inputValue: valToStr
    });
    return true;
  };
  onChange = (e: Object) => {
    const { value } = e.currentTarget;
    this.isVaild(value);
  };
  onClose = () => {
    this.setState({
      isErrorInput: false,
      inputValue: undefined,
      errorExplain: undefined,
      transferTo: undefined
    });
    this.props.hideModal();
  };
  handleSending = () => {
    const { inputValue, transferTo } = this.state;
    const {
      typeModal,
      daysToPayday,
      addWholeBudget,
      vk_id,
      calcTempCosts
    } = this.props;
    let transferToDefault = transferTo || "common";
    if (typeModal && typeModal.includes("transfer")) {
      const to = typeModal.split("_")[0];
      if (to === "common") transferToDefault = "fun";
    }
    const [typeModalonly, operation] = typeModal.split("_");
    const dateNow = new Date().toLocaleDateString();
    console.log("handleSending[ModalOverlay]:", operation, transferToDefault);

    if (this.isVaild(inputValue)) {
      this.onClose();
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
            transferTo ? transferTo : transferToDefault
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

  handleRadio = (e: Object) => {
    const { value } = e.target;
    this.setState({ transferTo: value });
  };

  render() {
    const { typeModal, common, fun, invest } = this.props;

    const { errorExplain } = this.state;
    let headerTitle = "";
    let placeholder = "";
    let bottomWarning = "";
    switch (typeModal) {
      case "budget_minus":
        headerTitle = "Расход - Бюджет";
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "budget_plus":
        headerTitle = "Доход - Бюджет";
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "budget":
        headerTitle = "Корректировка - Бюджет";
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "common_minus":
        headerTitle = "Расход - 50%";
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "common_plus":
        headerTitle = "Доход - 50%";
        placeholder = "0000.0";
        bottomWarning = "Введите число, которое больше нуля";
        break;
      case "fun_plus":
        headerTitle = "Доход - 30%";
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "fun_minus":
        headerTitle = "Расход - 30%";
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "invest_minus":
        headerTitle = "Расход - 20%";
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "invest_plus":
        headerTitle = "Доход - 20%";
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "common_transfer":
        headerTitle = "Перевод из 50%";
        placeholder = "" + common;
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "fun_transfer":
        headerTitle = "Перевод из 30%";
        placeholder = "" + fun;
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "invest_transfer":
        headerTitle = "Перевод из 20%";
        placeholder = "" + invest;
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case null:
        break;
      default:
        console.warn(`[Unknown type of modal]: ${typeModal}`);
        break;
    }

    console.log("+++++", this.state.transferTo);

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
        <ModalPage
          id={"common_transfer"}
          onClose={this.onClose}
          header={header}
        >
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <FormLayoutGroup
              bottom="Перевести в категорию"
              onChange={this.handleRadio}
            >
              <Radio
                name="radio"
                value="common"
                description="Общие расходы"
                disabled
              >
                50%
              </Radio>

              <Radio
                name="radio"
                value="fun"
                description="Расходы на развлечения"
                defaultChecked
              >
                30%
              </Radio>
              <Radio name="radio" value="invest" description="Инвестиции">
                20%
              </Radio>
            </FormLayoutGroup>
          </FormLayout>
        </ModalPage>
        <ModalPage id={"fun_transfer"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <FormLayoutGroup
              bottom="Перевести в категорию"
              onChange={this.handleRadio}
            >
              <Radio
                name="radio"
                value="common"
                description="Общие расходы"
                defaultChecked
              >
                50%
              </Radio>

              <Radio
                name="radio"
                value="fun"
                description="Расходы на развлечения"
                disabled
              >
                30%
              </Radio>
              <Radio name="radio" value="invest" description="Инвестиции">
                20%
              </Radio>
            </FormLayoutGroup>
          </FormLayout>
        </ModalPage>
        <ModalPage
          id={"invest_transfer"}
          onClose={this.onClose}
          header={header}
        >
          <FormLayout>
            <Input
              placeholder={placeholder}
              type="number"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <FormLayoutGroup
              bottom="Перевести в категорию"
              onChange={this.handleRadio}
            >
              <Radio
                name="radio"
                value="common"
                description="Общие расходы"
                defaultChecked
              >
                50%
              </Radio>

              <Radio
                name="radio"
                value="fun"
                description="Расходы на развлечения"
              >
                30%
              </Radio>

              <Radio
                name="radio"
                value="invest"
                description="Инвестиции"
                disabled
              >
                20%
              </Radio>
            </FormLayoutGroup>
          </FormLayout>
        </ModalPage>
      </ModalRoot>
    );
  }
}
