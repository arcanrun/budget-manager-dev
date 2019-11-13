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
  Radio,
  Button,
  Textarea
} from "@vkontakte/vkui";
import { IS_PLATFORM_IOS, IS_PLATFORM_ANDROID } from "@vkontakte/vkui";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";

import style from "./Modal.module.css";

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
  invest: ?number,
  budget: ?string,
  params: string
};
type STATE = {
  isErrorInput: boolean,
  codeErrorInputComment: number,
  inputValue?: string,
  inputValueComment?: string,
  transferTo: ?string,
  errorExplain: ?string,
  screenHeight: number,
  screenWidth: number
};
export class Modal extends React.Component<PROPS, STATE> {
  constructor(props: Object) {
    super(props);
    const { typeModal } = this.props;

    this.state = {
      isErrorInput: false,
      inputValue: undefined,
      inputValueComment: undefined,
      codeErrorInputComment: 0,
      transferTo: undefined,
      errorExplain: undefined,
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.setSize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.setSize);
  }

  setSize = (e: Object) => {
    const screenHeight = e.target.innerHeight;
    const screenWidth = e.target.innerWidth;
    this.setState({
      screenHeight,
      screenWidth
    });
  };

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
    } else if (value[0] === ".") {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (valToNumber < 0.01) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Слишком маленькое число"
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

  onChangeComment = (e: Object) => {
    const { value } = e.currentTarget;
    const userText = value.replace(/^\s+/, "").replace(/\s+$/, "");
    if (userText.length > 126) {
      this.setState({ codeErrorInputComment: 1 });
      this.setState({ inputValueComment: value });
    } else if (userText === "") {
      if (value.length === 0) {
        this.setState({ codeErrorInputComment: 0 });
        this.setState({ inputValueComment: value });
      } else {
        this.setState({ codeErrorInputComment: 2 });
        this.setState({ inputValueComment: value });
      }
    } else if (userText.search(/[<>/:={};$%^&*#@|'"]/) !== -1) {
      this.setState({ codeErrorInputComment: 2 });
      this.setState({ inputValueComment: value });
    } else {
      this.setState({ codeErrorInputComment: 0 });
      this.setState({ inputValueComment: value });
    }
  };

  onClose = () => {
    this.props.hideModal();
    this.setState({
      isErrorInput: false,
      inputValue: undefined,
      inputValueComment: undefined,
      errorExplain: undefined,
      transferTo: undefined
    });
  };
  handleSending = () => {
    const {
      inputValue,
      inputValueComment,
      transferTo,
      codeErrorInputComment
    } = this.state;
    const {
      typeModal,
      daysToPayday,
      addWholeBudget,
      calcTempCosts,
      params
    } = this.props;

    let transferToDefault = transferTo || "common";

    if (typeModal && typeModal.includes("transfer")) {
      const to = typeModal.split("_")[0];
      if (to === "common") transferToDefault = "fun";
    }

    const [typeModalonly, operation] = typeModal.split("_");

    if (this.isVaild(inputValue) && !!codeErrorInputComment === false) {
      this.onClose();

      switch (typeModalonly) {
        case "budget":
          if (operation) {
            this.props.calcBudget(
              inputValue,
              typeModalonly,
              operation,
              inputValueComment,
              params
            );
            break;
          }
          const type = daysToPayday ? "change" : "add";
          addWholeBudget(inputValue, type, params);
          break;
        case "common":
        case "fun":
        case "invest":
          calcTempCosts(
            inputValue,
            typeModalonly,
            operation,
            transferTo ? transferTo : transferToDefault,
            inputValueComment,
            params
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
    const { typeModal, common, fun, invest, budget } = this.props;
    const {
      errorExplain,
      screenWidth,
      isErrorInput,
      codeErrorInputComment
    } = this.state;

    let headerTitle = "...";
    let placeholder = "...";
    let bottomWarning = "...";
    let bottomWarningComment = "...";
    switch (typeModal) {
      case "budget_minus":
        headerTitle =
          screenWidth < 246 ? (
            <div className={style.marquee}>
              <div>Расход - Бюджет</div>
            </div>
          ) : (
            <span>Расход - Бюджет</span>
          );

        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";

        break;
      case "budget_plus":
        headerTitle =
          screenWidth < 240 ? (
            <div className={style.marquee}>
              <div>Доход - Бюджет</div>
            </div>
          ) : (
            <span>Доход - Бюджет</span>
          );
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
        break;
      case "budget":
        const titleOne =
          screenWidth < 316 ? (
            <div className={style.marquee}>
              <div>Корректировка - Бюджет</div>
            </div>
          ) : (
            <span>Корректировка - Бюджет</span>
          );

        const titleTwo =
          screenWidth < 169 ? (
            <div className={style.marquee}>
              <div>Бюджет</div>
            </div>
          ) : (
            <span>Бюджет</span>
          );

        headerTitle = budget ? titleOne : titleTwo;
        placeholder = budget ? budget : "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        break;
      case "common_minus":
        headerTitle =
          screenWidth < 214 ? (
            <div className={style.marquee}>
              <div>Расход - 50%</div>
            </div>
          ) : (
            <span>Расход - 50%</span>
          );
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
        break;
      case "common_plus":
        headerTitle =
          screenWidth < 207 ? (
            <div className={style.marquee}>
              <div>Доход - 50%</div>
            </div>
          ) : (
            <span>Доход - 50%</span>
          );
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
        break;
      case "fun_plus":
        headerTitle =
          screenWidth < 207 ? (
            <div className={style.marquee}>
              <div>Доход - 30%</div>
            </div>
          ) : (
            <span>Доход - 30%</span>
          );
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
        break;
      case "fun_minus":
        headerTitle =
          screenWidth < 214 ? (
            <div className={style.marquee}>
              <div>Расход - 30%</div>
            </div>
          ) : (
            <span>Расход - 30%</span>
          );
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
        break;
      case "invest_minus":
        headerTitle =
          screenWidth < 214 ? (
            <div className={style.marquee}>
              <div>Расход - 20%</div>
            </div>
          ) : (
            <span>Расход - 20%</span>
          );
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
        break;
      case "invest_plus":
        headerTitle =
          screenWidth < 207 ? (
            <div className={style.marquee}>
              <div>Доход - 20%</div>
            </div>
          ) : (
            <span>Доход - 20%</span>
          );
        placeholder = "0000.0";
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
        break;
      case "common_transfer":
        headerTitle =
          screenWidth < 238 ? (
            <div className={style.marquee}>
              <div>Перевод из 50%</div>
            </div>
          ) : (
            <span>Перевод из 50%</span>
          );
        placeholder = "" + common;
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
        break;
      case "fun_transfer":
        headerTitle =
          screenWidth < 238 ? (
            <div className={style.marquee}>
              <div>Перевод из 30%</div>
            </div>
          ) : (
            <span>Перевод из 30%</span>
          );
        placeholder = "" + fun;
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
        break;
      case "invest_transfer":
        headerTitle =
          screenWidth < 238 ? (
            <div className={style.marquee}>
              <div>Перевод из 20%</div>
            </div>
          ) : (
            <span>Перевод из 20%</span>
          );
        placeholder = "" + invest;
        bottomWarning = errorExplain
          ? errorExplain
          : "Введите число, которое больше нуля";
        if (codeErrorInputComment === 0)
          bottomWarningComment = "Введите комментарий или оставьте поле пустым";
        if (codeErrorInputComment === 1)
          bottomWarningComment = "Слишком большой комментарий";
        if (codeErrorInputComment === 2)
          bottomWarningComment = "Недопустимый символ";
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
          IS_PLATFORM_ANDROID && (
            <HeaderButton onClick={this.onClose}>
              <Icon24Cancel />
            </HeaderButton>
          )
        }
        right={
          IS_PLATFORM_IOS && (
            <HeaderButton onClick={this.onClose}>
              <Icon24Dismiss />
            </HeaderButton>
          )
        }
      >
        {headerTitle}
      </ModalPageHeader>
    );
    const submitBtn = (
      <Button level="commerce" size="xl" onClick={this.handleSending}>
        Готово
      </Button>
    );
    return (
      <ModalRoot activeModal={typeModal}>
        <ModalPage
          id={"budget_minus"}
          onClose={this.onClose}
          header={header}
          dynamicContentHeight={true}
          settlingHeight={100}
        >
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
            />
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage id={"budget_plus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
            />
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage id={"budget"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage id={"common_minus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
            />
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage id={"common_plus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
            />
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage id={"fun_plus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
            />
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage id={"fun_minus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
            />
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage id={"invest_plus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
            />
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage id={"invest_minus"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
            />
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage
          id={"common_transfer"}
          onClose={this.onClose}
          header={header}
        >
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
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
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage id={"fun_transfer"} onClose={this.onClose} header={header}>
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
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
            {submitBtn}
          </FormLayout>
        </ModalPage>
        <ModalPage
          id={"invest_transfer"}
          onClose={this.onClose}
          header={header}
        >
          <FormLayout>
            <Input
              inputMode="numeric"
              placeholder={placeholder}
              type="text"
              onChange={this.onChange}
              status={isErrorInput ? "error" : "default"}
              bottom={bottomWarning}
            />
            <Textarea
              onChange={this.onChangeComment}
              placeholder="Комментарий"
              status={codeErrorInputComment ? "error" : "default"}
              bottom={bottomWarningComment}
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
            {submitBtn}
          </FormLayout>
        </ModalPage>
      </ModalRoot>
    );
  }
}
