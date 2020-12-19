export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEventClose = this._handleEventClose.bind(this);
  }

  // Анимация открытия и закрытия модального окна
  _slideDownPopup() {
    this._popup.querySelector('.popup__body').classList.add('popup__body_slice');
  }

  _slideUpPopup() {
    this._popup.querySelector('.popup__body').classList.remove('popup__body_slice');
  }

  // Закрытие модального окна
  close() {
    this._popup.querySelector('.popup__body').classList.remove('popup__body_slice');
    document.removeEventListener('keydown', this._handleEventClose);
    document.removeEventListener('click', this._handleEventClose);
    this._popup.classList.remove('popup_show');
  }

  // Закрытие по событию 
  _handleEventClose(evt) {

    if (evt.key === 'Escape' || evt.target.classList.contains('popup_show')) {
      evt.preventDefault();
      this.close();
    }
  };

  // Открытие модального окна
  open() {
    this._popup.classList.add('popup_show');
    this._popup.querySelector('.popup__body').classList.add('popup__body_slice');
    document.addEventListener('keydown', this._handleEventClose);
    document.addEventListener('click', this._handleEventClose);
  }

  // Установка слушателей
  setEventListeners() {
    this._popup.querySelector('.popup__button-close').addEventListener('click', this.close.bind(this));
  }
}