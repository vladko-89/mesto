import { validationConfig } from '../utils/constants.js';

export class FormValidator {

  constructor(form, config) {
    this.form = form;
    this._config = config;
  }

  // Включаем стилизацию ошибок на форме
  _showInputError(inputItem, errorMessage) {
    const errorItem = this.form.querySelector(`#${inputItem.id}-error`);

    inputItem.classList.add(this._config.inputErrorClass);
    errorItem.textContent = errorMessage;
    errorItem.classList.add(this._config.errorClass);
  }

  // Убираем стилизацию ошибок с формы
  _hideInputError(inputItem) {
    const errorItem = this.form.querySelector(`#${inputItem.id}-error`);

    inputItem.classList.remove(this._config.inputErrorClass);
    errorItem.classList.remove(this._config.errorClass);
    errorItem.textContent = '';
  }

  // Проверяем текущее поле
  _isValid(inputItem) {
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    }
    else {
      this._hideInputError(inputItem);
    }
  }

  // Инициируем проверку полей загруженной формы
  _hasValidInput(inputList) {
    return inputList.some((inputItem) => {

      return !inputItem.validity.valid;
    });
  }

  // Переключатель состояния кнопки "Отправить"
  _toggleButtonState(inputList, buttonItem) {
    if (this._hasValidInput(inputList)) {
      buttonItem.classList.add(this._config.inactiveButtonClass);
    }
    else {
      buttonItem.classList.remove(this._config.inactiveButtonClass);
    }
  }

  // Вешаем обработчики событий
  _setEventListeners() {
    const inputList = Array.from(this.form.querySelectorAll(this._config.inputSelector));
    const buttonItem = this.form.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(inputList, buttonItem);

    inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {

        this._isValid(inputItem);

        this._toggleButtonState(inputList, buttonItem);
      });
    });
  }

  // 
  enableValidation() {

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}