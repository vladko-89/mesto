import { initialCards } from './initial-card.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { validationConfig } from './config.js';



// --- БЛОК ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ ---
const modalCardImage = document.querySelector('.popup__card-image');
const modalSign = document.querySelector('.popup__sign');



const modalProfile = document.querySelector('.popup_type_profile');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');
const modalBodyProfile = document.querySelector('.popup__body_modal_profile');
const modalBodyNewCard = document.querySelector('.popup__body_modal_new-card');
const modalBodyImage = document.querySelector('.popup__body_modal_image');

const formProfile = modalProfile.querySelector('.popup__profile');
const modalBodyProfileName = modalProfile.querySelector('.popup__input_item_name');
const modalBodyProfileSpecial = modalProfile.querySelector('.popup__input_item_specialization');
const profileName = document.querySelector('.profile__name');
const profileSpecial = document.querySelector('.profile__specialization');

const formNewCard = modalNewCard.querySelector('.popup__new-card');
const modalCardName = modalNewCard.querySelector('.popup__input_item_title');

const cardTitle = document.querySelector('.popup__input_item_title');
const cardLink = document.querySelector('.popup__input_item_path');
const cardsList = document.querySelector('.cards');

const profileEditButton = document.querySelector('.profile__button-edit');
const buttonCreateCard = document.querySelector('.profile__button-new-card');
const modalCloseProfile = document.querySelector('.popup__button-close_modal_profile');
const modalCloseNewCard = document.querySelector('.popup__button-close_modal_new-card');
const modalCloseImage = document.querySelector('.popup__button-close_modal_image');
// --- 

const formUserProfile = new FormValidator(formProfile, validationConfig);
formUserProfile.enableValidation();
const formAddCard = new FormValidator(formNewCard, validationConfig);
formAddCard.enableValidation();

// --- ФУНКЦИЯ плавного появления модального окна  ---
const slidePopup = (body) => {
  body.classList.toggle('popup__body_slice');
};

// --- ФУНКЦИЯ Закрытие формы ---
function closeModal(popup, body) {
  slidePopup(body);
  document.removeEventListener('keydown', closeModalEvent);
  document.removeEventListener('click', closeModalEvent);
  popup.classList.remove('popup_show');
}

// --- ФУНКЦИЯ Закрытие по событию  ---
const closeModalEvent = (evt) => {
  const showPopup = document.querySelector('.popup_show');
  const showBody = showPopup.querySelector('.popup__body');

  if (evt.key === 'Escape' || evt.target.classList.contains('popup_show')) {
    evt.preventDefault();
    closeModal(showPopup, showBody);
  }
};

// --- ФУНКЦИЯ Открытие формы ---
const openModal = (popup, body) => {

  popup.classList.add('popup_show');
  slidePopup(body);
  document.addEventListener('keydown', closeModalEvent);
  document.addEventListener('click', closeModalEvent);
};

const blockSubmitButton = ((form) => {
  const buttonSubmit = form.querySelector(validationConfig.submitButtonSelector);

  if (buttonSubmit) {
    buttonSubmit.classList.add(validationConfig.inactiveButtonClass);
  }
});

// --- ФУНКЦИЯ Загрузка формы профиля ---
const openEditProfileModal = () => {

  modalBodyProfileName.value = profileName.textContent;
  modalBodyProfileSpecial.value = profileSpecial.textContent;

  modalBodyProfileName.focus();

  blockSubmitButton(formProfile);

  openModal(modalProfile, modalBodyProfile);
};

// --- ФУНКЦИЯ Загрузка формы создания карточки ---
const openAddCardModal = () => {

  formNewCard.reset();

  modalCardName.focus();

  blockSubmitButton(formNewCard);

  openModal(modalNewCard, modalBodyNewCard);
};

// --- ФУНКЦИЯ Отправка формы ---
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = modalBodyProfileName.value;
  profileSpecial.textContent = modalBodyProfileSpecial.value;

  closeModal(modalProfile, modalBodyProfile);
};

// Открываем большую карточку
const openBigCard = (name, link) => {
  modalCardImage.src = link;
  modalCardImage.alt = `Карточка ${name}`;
  modalSign.textContent = name;

  openModal(modalImage, modalBodyImage);
}


const addCard = (evt) => {
  evt.preventDefault();

  const cardData = {
    name: cardTitle.value,
    link: cardLink.value
  };

  const card = new Card(cardData, '.card-template', openBigCard);
  const cardElement = card.generateCard();

  cardsList.prepend(cardElement);

  closeModal(modalNewCard, modalBodyNewCard);
};

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template', openBigCard);


  const cardElement = card.generateCard();

  cardsList.append(cardElement);
});



// ---БЛОК ОБРАБОТКИ СОБЫТИЙ ---

profileEditButton.addEventListener('click', openEditProfileModal);
buttonCreateCard.addEventListener('click', openAddCardModal);

modalCloseProfile.addEventListener('click', () => closeModal(modalProfile, modalBodyProfile));
modalCloseNewCard.addEventListener('click', () => closeModal(modalNewCard, modalBodyNewCard));
modalCloseImage.addEventListener('click', () => closeModal(modalImage, modalBodyImage));

formProfile.addEventListener('submit', handleFormSubmit);

formNewCard.addEventListener('submit', addCard);
// ---