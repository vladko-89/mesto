import './index.css';

import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/user-info.js';
import PopupWithImage from '../components/popup-with-image.js';
import PopupWithForm from '../components/popup-with-form.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Api from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  validationConfig, containerSelector, modalProfile, nameInput, specialInput, modalAvatar, linkInput
} from '../utils/constants.js';


// --- БЛОК ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ ---
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');
const modalCardDelete = document.querySelector('.popup_type_card-delete');
const formCardDelete = modalCardDelete.querySelector('.popup__card-del');

const formAvatar = modalAvatar.querySelector('.popup__avatar');

const formProfile = modalProfile.querySelector('.popup__profile');

const formNewCard = modalNewCard.querySelector('.popup__new-card');
const modalCardName = modalNewCard.querySelector('.popup__input_item_title');
let infoUser;

const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__button-edit');
const buttonCreateCard = document.querySelector('.profile__button-new-card');
// --- 

// --- Создаем экземпляры класса валидации для каждой формы
const formUserProfile = new FormValidator(formProfile, validationConfig);
formUserProfile.enableValidation();
const formAddCard = new FormValidator(formNewCard, validationConfig);
formAddCard.enableValidation();
const formRemoveCard = new FormValidator(formCardDelete, validationConfig);
formRemoveCard.enableValidation();
const formUserAvatar = new FormValidator(formAvatar, validationConfig);
formUserAvatar.enableValidation();
const userInfo = new UserInfo();

const api = new Api();

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((values) => {
    const user = values[0];
    const cards = values[1];
    console.log(user);
    console.log(cards);
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
    initializationCards.renderItems(cards, user);
    infoUser = user;
  })
  .catch((err) => {
    console.log(err);
  })

const popupBigCard = new PopupWithImage(modalImage);
popupBigCard.setEventListeners();

// --- ФУНКЦИЯ Загрузка формы профиля ---
const openEditProfileModal = () => {

  const dataForm = userInfo.getUserInfo();

  nameInput.value = dataForm.name;
  specialInput.value = dataForm.special;


  formUserProfile.blockSubmitButton();
  popupProfile.open();
  nameInput.focus();
};

// --- ФУНКЦИЯ Загрузка формы создания карточки ---
const openAddCardModal = () => {

  modalCardName.focus();

  formAddCard.blockSubmitButton();

  popupNewCard.open();
};

// --- ФУНКЦИЯ Загрузка формы смены аватара ---
const openAvatarModal = () => {
  const linkAvatar = userInfo.getUserAvatar();

  linkInput.value = linkAvatar;

  formUserAvatar.blockSubmitButton();

  popupAvatar.open();
};

// --- ФУНКЦИЯ Отправка формы ---
const handleFormSubmit = (item) => {
  const button = formProfile.querySelector('.popup__button-submit');
  button.textContent = formUserProfile.modificationTextButton();
  const { user, specialization } = item;

  api.editUserInfo(item)
    .then((res) => {
      console.log(res);
      userInfo.setUserInfo(res.name, res.about);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = formUserProfile.backTextButton();
    })
};

// ---ФУНКЦИЯ Обновление Аватара пользователя ---
const updateUserAvatar = (linkInput) => {
  const { link } = linkInput;
  const button = formAvatar.querySelector('.popup__button-submit');
  button.textContent = formUserAvatar.modificationTextButton();
  api.updateAvatar(link)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = formUserAvatar.backTextButton();
    })
};
const popupAvatar = new PopupWithForm(modalAvatar, updateUserAvatar)
popupAvatar.setEventListeners();
const popupProfile = new PopupWithForm(modalProfile, handleFormSubmit);
popupProfile.setEventListeners();

// --- ФУНКЦИЯ Открываем большую карточку
const openBigCard = (name, link) => {

  popupBigCard.open(name, link);
}


// --- ФУНКЦИЯ Добавление новой карточки
const addCard = (item) => {
  const button = formNewCard.querySelector('.popup__button-submit');
  button.textContent = formAddCard.modificationTextButton();
  api.addNewCard(item)
    .then((res) => {
      const card = new Card(res, infoUser, '.card-template', openBigCard, handleTrashClick, handleLikeClick);
      const cardElement = card.generateCard();

      initializationCards.addItemHead(cardElement);

      popupNewCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = formAddCard.backTextButton();
    })
};

const popupConfirm = new PopupConfirm(modalCardDelete);
popupConfirm.setEventListeners();

// --- ФУНКЦИЯ Открытие формы удаления карточки ---
function handleTrashClick(id, card) {
  popupConfirm.setSubmitAction(() => handlePopupConfirm(id, card))
  popupConfirm.open();
}
// --- ФУНКЦИЯ Удаление карточек пользователя ---
function handlePopupConfirm(id, card) {
  const button = formCardDelete.querySelector('.popup__button-submit');
  button.textContent = formRemoveCard.modificationTextButton();
  api.deleteCard(id, card)
    .then((item) => {
      console.log(item);
      card.deleteCard();
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err);
      popupConfirm.close();
    })
    .finally(() => {
      button.textContent = formRemoveCard.backTextButton();
    })
}

// --- ФУНКЦИЯ Включаем/выключаем Лайк ---
const handleLikeClick = (id, isLiked, card) => {
  if (isLiked) {
    //отправляем запрос снятия лайка
    api.deleteLike(id)
      .then((data) => {
        //вызываем метод карточки для обновления отображения лайков
        card.setLikes(data.likes);
        card.dislikeCard();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  else {
    //отправляем запрос на установку лайка
    api.putLike(id)
      .then((data) => {
        //вызываем метод карточки для обновления отображения лайков
        card.setLikes(data.likes);
        card.likeCard();
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

const popupNewCard = new PopupWithForm(modalNewCard, addCard, handleTrashClick, handleLikeClick);
popupNewCard.setEventListeners();

// --- Отрисовываем карточки при загрузке страницы
const initializationCards = new Section({
  //data: initialCards,
  renderer: (item, user) => {
    const card = new Card(item, user, '.card-template', openBigCard, handleTrashClick, handleLikeClick);
    const cardElement = card.generateCard();

    initializationCards.addItem(cardElement);
  }
}, containerSelector);


// ---БЛОК ОБРАБОТКИ СОБЫТИЙ ---

profileEditButton.addEventListener('click', openEditProfileModal);
buttonCreateCard.addEventListener('click', openAddCardModal);
profileAvatar.addEventListener('click', openAvatarModal);
// ---