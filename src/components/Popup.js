export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this._handleEventClose = this._handleEventClose.bind(this);
  }

  // Анимация открытия и закрытия модального окна
  _slideDownPopup() {
    this.popup.querySelector('.popup__body').classList.add('popup__body_slice');
  }

  _slideUpPopup() {
    this.popup.querySelector('.popup__body').classList.remove('popup__body_slice');
  }

  // Закрытие модального окна
  closePopup() {
    this._slideUpPopup();
    document.removeEventListener('keydown', this._handleEventClose);
    document.removeEventListener('click', this._handleEventClose);
    this.popup.classList.remove('popup_show');
  }

  // Закрытие по событию 
  _handleEventClose(evt) {

    if (evt.key === 'Escape' || evt.target.classList.contains('popup_show')) {
      evt.preventDefault();
      this.closePopup();
    }
  };

  // Открытие модального окна
  openPopup() {
    this.popup.classList.add('popup_show');
    this._slideDownPopup();
    document.addEventListener('keydown', this._handleEventClose);
    document.addEventListener('click', this._handleEventClose);
  }

  // Установка слушателей
  setEventListener() {
    this.popup.querySelector('.popup__button-close').addEventListener('click', this.closePopup.bind(this));
  }
}