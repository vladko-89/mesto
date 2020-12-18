import './index.css';

import { initialCards } from '../utils/initial-card.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/user-info.js';
import PopupWithImage from '../components/popup-with-image.js';
import PopupWithForm from '../components/popup-with-form.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  validationConfig, containerSelector, modalProfile
} from '../utils/constants.js';


// --- БЛОК ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ ---
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');

const formProfile = modalProfile.querySelector('.popup__profile');

const formNewCard = modalNewCard.querySelector('.popup__new-card');
const modalCardName = modalNewCard.querySelector('.popup__input_item_title');

const profileEditButton = document.querySelector('.profile__button-edit');
const buttonCreateCard = document.querySelector('.profile__button-new-card');
// --- 

// --- Создаем экземпляры класса валидации для каждой формы
const formUserProfile = new FormValidator(formProfile, validationConfig);
formUserProfile.enableValidation();
const formAddCard = new FormValidator(formNewCard, validationConfig);
formAddCard.enableValidation();

const userInfo = new UserInfo();


const popupBigCard = new PopupWithImage(modalImage);
popupBigCard.setEventListener();

// --- ФУНКЦИЯ Загрузка формы профиля ---
const openEditProfileModal = () => {

  const dataForm = userInfo.getUserInfo();

  const special = modalProfile.querySelector('.popup__input_item_specialization');
  const name = modalProfile.querySelector('.popup__input_item_name');


  name.value = dataForm.name;
  special.value = dataForm.special;
  name.focus();


  formUserProfile.blockSubmitButton();

  popupProfile.openPopup();
};

// --- ФУНКЦИЯ Загрузка формы создания карточки ---
const openAddCardModal = () => {

  //formNewCard.reset();

  modalCardName.focus();

  formAddCard.blockSubmitButton();

  popupNewCard.openPopup();
};

// --- ФУНКЦИЯ Отправка формы ---
const handleFormSubmit = (item) => {
  const { user, specialization } = item;
  userInfo.setUserInfo(user, specialization);

  popupProfile.closePopup();
};

const popupProfile = new PopupWithForm(modalProfile, handleFormSubmit);
popupProfile.setEventListener();

// --- ФУНКЦИЯ Открываем большую карточку
const openBigCard = (name, link) => {

  popupBigCard.openPopup(name, link);
}

// --- ФУНКЦИЯ Добавление новой карточки
const addCard = (item) => {

  const card = new Card(item, '.card-template', openBigCard);
  const cardElement = card.generateCard();

  initializationCards.addItemHead(cardElement);

  popupNewCard.closePopup();
};

const popupNewCard = new PopupWithForm(modalNewCard, addCard);
popupNewCard.setEventListener();

// --- Отрисовываем карточки при загрузке страницы
const initializationCards = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template', openBigCard);
    const cardElement = card.generateCard();

    initializationCards.addItem(cardElement);
  }
}, containerSelector);

initializationCards.renderer();

// ---БЛОК ОБРАБОТКИ СОБЫТИЙ ---

profileEditButton.addEventListener('click', openEditProfileModal);
buttonCreateCard.addEventListener('click', openAddCardModal);
// ---