import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._modalCardImage = popup.querySelector('.popup__card-image');
    this._modalSign = popup.querySelector('.popup__sign');
  }

  open(name, link) {
    super.open();
    this._modalCardImage.src = link;
    this._modalCardImage.alt = `Карточка ${name}`;
    this._modalSign.textContent = name;

  }
}