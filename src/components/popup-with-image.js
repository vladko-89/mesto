import { modalCardImage, modalSign } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  openPopup(name, link) {
    super.openPopup();
    modalCardImage.src = link;
    modalCardImage.alt = `Карточка ${name}`;
    modalSign.textContent = name;

  }
}