const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// --- ФУНКЦИЯ плавного появления модального окна  ---
const modalWindow = document.querySelector('.popup');
let modalProfile = document.querySelector('.popup__body');

function popupSlice() {
  modalProfile.classList.toggle('popup__body_slice');
}


// --- ФУНКЦИЯ Открытие формы ---

function openModal() {
  modalWindow.classList.add('popup_show');
  popupSlice();
}


// --- ФУНКЦИЯ Загрузка формы профиля ---
const formProfile = modalWindow.querySelector('.popup__profile');
const modalProfileName = modalWindow.querySelector('.popup__input_item_name');
const modalProfileSpecial = modalWindow.querySelector('.popup__input_item_specialization');
const profileName = document.querySelector('.profile__name');
const profileSpecial = document.querySelector('.profile__specialization');

function loadProfile() {
  closeForm();
  //formNewCard.classList.remove('form_opened');
  formProfile.classList.add('form_opened');
  modalProfileName.value = profileName.textContent;
  modalProfileSpecial.value = profileSpecial.textContent;
  modalProfileName.focus();
  openModal();
}

// --- ФУНКЦИЯ Закрываю все открытые формы ---
const forms = document.querySelectorAll('.form');

const closeForm = () => {
  forms.forEach((item) => {
    item.classList.remove('form_opened');
  });
}



// --- ФУНКЦИЯ Загрузка формы создания карты ---
const formNewCard = modalWindow.querySelector('.popup__new-card');
const modalCardName = modalWindow.querySelector('.popup__input_item_title');
const modalCardPath = modalWindow.querySelector('.popup__input_item_path');

function loadNewCard() {
  closeForm();
  //formProfile.classList.remove('form_opened');
  formNewCard.classList.add('form_opened');
  modalCardName.focus();
  openModal();
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



// --- Закрытие модального окна по ESC ---

const closeESC = key => {
  if (modalWindow.classList.contains('popup_show')) {
    if (key.keyCode === 27) {
      key.preventDefault();
      closeModal();
    }
  }
}

function modalClickHandler(event) {
  if (event.target.classList.contains('popup')) {
    closeModal();
  }
}

// ---БЛОК ОБРАБОТКИ СОБЫТИЙ ---
const profileEditButton = document.querySelector('.profile__button-edit');
profileEditButton.addEventListener('click', loadProfile);

const buttonCreateCard = document.querySelector('.profile__button-new-card');
buttonCreateCard.addEventListener('click', loadNewCard);

const modalCloseButton = document.querySelector('.popup__button-close');
modalCloseButton.addEventListener('click', closeModal);

modalProfile.addEventListener('submit', formSubmitHandler);


window.addEventListener('keydown', closeESC);

window.addEventListener('click', modalClickHandler);
