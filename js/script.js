// --- ФУНКЦИЯ Открытие формы ---
let modalWindow = document.querySelector('.popup');
let modalProfileName = modalWindow.querySelector('.popup__input_item_name');
let modalProfileSpecial = modalWindow.querySelector('.popup__input_item_specialization');
let profileName = document.querySelector('.profile__name');
let profileSpecial = document.querySelector('.profile__specialization');

function openModal() {
  modalProfileName.value = profileName.textContent;
  modalProfileSpecial.value = profileSpecial.textContent;
  modalProfileName.focus();
  modalWindow.classList.add('popup_show');
  popupSlice();
}

// --- ФУНКЦИЯ Закрытие формы ---
function closeModal() {
  popupSlice()
  modalWindow.classList.remove('popup_show');
}

// --- ФУНКЦИЯ Отправка формы ---
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = modalProfileName.value;
  profileSpecial.textContent = modalProfileSpecial.value;
  closeModal();
}

// --- ФУНКЦИЯ плавного появления модального окна  ---
let modalProfile = document.querySelector('.popup__body');

function popupSlice() {
  modalProfile.classList.toggle('popup__body_slice');
}

// --- Закрытие модального окна по ESC ---

const closeESC = key => {
  if (modalWindow.classList.contains('popup_show')) {
    if (key.keyCode === 27) {
      key.preventDefault();
      closeModal();
    }
  }
}

// ---БЛОК ОБРАБОТКИ СОБЫТИЙ ---
let profileEditButton = document.querySelector('.profile__button-edit');
profileEditButton.addEventListener('click', openModal);

let modalCloseButton = document.querySelector('.popup__button-close');
modalCloseButton.addEventListener('click', closeModal);

modalProfile.addEventListener('submit', formSubmitHandler);


window.addEventListener('keydown', closeESC);

function modalClickHandler(event) {
  if (event.target.classList.contains('popup')) {
    closeModal();
  }
}
window.addEventListener('click', modalClickHandler);
