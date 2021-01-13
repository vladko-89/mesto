
export default class UserInfo {
  constructor() {
    this._modalProfile = document.querySelector('.popup_type_profile');
    this._profileName = document.querySelector('.profile__name');
    this._profileSpecial = document.querySelector('.profile__specialization');
    this._profileAvatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      special: this._profileSpecial.textContent
    }
  }

  getUserAvatar() {
    return this._profileAvatar.src;
  }

  setUserInfo(name, special) {
    this._profileName.textContent = name;
    this._profileSpecial.textContent = special;
  }

  setUserAvatar(url) {
    this._profileAvatar.src = url;
  }
}