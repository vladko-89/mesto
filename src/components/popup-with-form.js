import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, sendForm) {
    super(popup);
    this._sendForm = sendForm;
    this._form = popup.querySelector('.form');
    this._button = this._form.querySelector('.popup__button-submit');
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._sendForm(this._getInputValues());
    });
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }
}




