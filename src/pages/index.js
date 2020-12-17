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
//const modalCardImage = document.querySelector('.popup__card-image');
//const modalSign = document.querySelector('.popup__sign');

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

const blockSubmitButton = ((form) => {
  const buttonSubmit = form.querySelector(validationConfig.submitButtonSelector);

  if (buttonSubmit) {
    buttonSubmit.classList.add(validationConfig.inactiveButtonClass);
  }
});





const popupBigCard = new PopupWithImage(modalImage);
popupBigCard.setEventListener();

// --- ФУНКЦИЯ Загрузка формы профиля ---
const openEditProfileModal = () => {

  userInfo.getUserInfo();

  blockSubmitButton(formProfile);

  popupProfile.openPopup();
};

// --- ФУНКЦИЯ Загрузка формы создания карточки ---
const openAddCardModal = () => {

  formNewCard.reset();

  modalCardName.focus();

  blockSubmitButton(formNewCard);

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

  containerSelector.prepend(cardElement);

  popupNewCard.closePopup();
  //closeModal(modalNewCard, modalBodyNewCard);
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

//formProfile.addEventListener('submit', handleFormSubmit);

//formNewCard.addEventListener('submit', addCard);
// ---