import { profileName, profileSpecial, modalProfile } from '../utils/constants.js';

export default class UserInfo {
  constructor() {
    this._modalProfile = document.querySelector('.popup_type_profile');
    this._profileName = document.querySelector('.profile__name');
    this._profileSpecial = document.querySelector('.profile__specialization');

  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      special: this._profileSpecial.textContent
    }

  }

  setUserInfo(name, special) {
    this._profileName.textContent = name;
    this._profileSpecial.textContent = special;
  }
}