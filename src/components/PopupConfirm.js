import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popup) {
    super(popup);
    this._buttonConfirm = popup.querySelector('.popup__button-submit');
  }
  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }
  // дополнительно добавляем обработчик клика подтверждения
  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener("click", () => {
      this._handleSubmitCallback()
    });
  }
}