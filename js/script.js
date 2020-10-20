let profileEdit = document.querySelector('.profile__link-edit');
let profileModal = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileSpecial = document.querySelector('.profile__specialization');
let buttonClose = document.querySelector('.popup__button-close');
let buttonSubmit = document.querySelector('.popup__button-submit');
let modalName = document.querySelector('.popup__input_item_name');
let modalSpecial = document.querySelector('.popup__input_item_specialization');

if (profileEdit) {
  profileEdit.addEventListener('click', function (evt) {
    evt.preventDefault();
    profileModal.classList.remove('popup_hidden');
    modalName.value = profileName.textContent;
    modalSpecial.value = profileSpecial.textContent;
  });
  buttonClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    profileModal.classList.add('popup_hidden');
  });
}

if (buttonSubmit) {
  buttonSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
    profileModal.classList.add('popup_hidden');
    profileName.textContent = modalName.value;
    profileSpecial.textContent = modalSpecial.value;
  });
}