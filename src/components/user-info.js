import { profileName, profileSpecial, modalProfile } from '../utils/constants.js';

export default class UserInfo {
  constructor() {
    this._name = modalProfile.querySelector('.popup__input_item_name');
    this._special = modalProfile.querySelector('.popup__input_item_specialization');
  }

  getUserInfo() {
    this._name.value = profileName.textContent;
    this._special.value = profileSpecial.textContent;

    this._name.focus();
  }

  setUserInfo(name, special) {
    profileName.textContent = name;
    profileSpecial.textContent = special;
  }
}