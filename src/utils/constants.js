
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

export const modalCardImage = document.querySelector('.popup__card-image');
export const modalSign = document.querySelector('.popup__sign');
export const containerSelector = document.querySelector('.cards');
export const modalProfile = document.querySelector('.popup_type_profile');
export const profileName = document.querySelector('.profile__name');
export const profileSpecial = document.querySelector('.profile__specialization');
export const specialInput = modalProfile.querySelector('.popup__input_item_specialization');
export const nameInput = modalProfile.querySelector('.popup__input_item_name');
export const modalAvatar = document.querySelector('.popup_type_avatar');
export const linkInput = modalAvatar.querySelector('.popup__input_item_path');
export const myProfileForm = {
  name: modalProfile.querySelector('.popup__input_item_name'),
  special: modalProfile.querySelector('.popup__input_item_specialization')
}