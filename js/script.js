// --- ФУНКЦИЯ Открытие формы ---
let modalName = document.querySelector('.popup__input_item_name');
let modalSpecial = document.querySelector('.popup__input_item_specialization');
let profileName = document.querySelector('.profile__name');
let profileSpecial = document.querySelector('.profile__specialization');
let profileModal = document.querySelector('.popup');
function openModal() {
  modalName.value = profileName.textContent;
  modalSpecial.value = profileSpecial.textContent;
  profileModal.classList.remove('popup_hidden');
  modalName.focus();
}

// --- ФУНКЦИЯ Закрытие формы ---
function closeModal() {
  profileModal.classList.add('popup_hidden');
}

// --- ФУНКЦИЯ Отправка формы ---
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileSpecial.textContent = modalSpecial.value;
  closeModal();
}


let profileEdit = document.querySelector('.profile__button-edit');
profileEdit.addEventListener('click', openModal);

let buttonClose = document.querySelector('.popup__button-close');
buttonClose.addEventListener('click', closeModal);

let formProfile = document.querySelector('.popup__body');
formProfile.addEventListener('submit', formSubmitHandler);

// --- Закрытие модального окна по ESC ---
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    profileModal.classList.add('popup_hidden');
  }
})