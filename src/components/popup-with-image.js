import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._modalCardImage = popup.querySelector('.popup__card-image');
    this._modalSign = popup.querySelector('.popup__sign');
  }

  openPopup(name, link) {
    super.openPopup();
    this._modalCardImage.src = link;
    this._modalCardImage.alt = `Карточка ${name}`;
    this._modalSign.textContent = name;

  }
}