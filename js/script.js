// --- БЛОК ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ ---
const modalCardImage = document.querySelector('.popup__card-image');
const modalSign = document.querySelector('.popup__sign');

const showModal = document.querySelector('.popup_show');

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
const modalCardPath = modalNewCard.querySelector('.popup__input_item_path');

const cardTitle = document.querySelector('.popup__input_item_title');
const cardLink = document.querySelector('.popup__input_item_path');
const cardsList = document.querySelector('.cards');

const profileEditButton = document.querySelector('.profile__button-edit');
const buttonCreateCard = document.querySelector('.profile__button-new-card');
const modalCloseProfile = document.querySelector('.popup__button-close_modal_profile');
const modalCloseNewCard = document.querySelector('.popup__button-close_modal_new-card');
const modalCloseImage = document.querySelector('.popup__button-close_modal_image');
// --- 


// --- ФУНКЦИЯ плавного появления модального окна  ---


const slidePopup = (body) => {
  body.classList.toggle('popup__body_slice');
};

// --- ФУНКЦИЯ Закрытие формы ---
function closeModal(popup, body) {
  slidePopup(body);
  window.removeEventListener('keydown', closeModalEvent);
  window.removeEventListener('click', closeModalEvent);
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
  window.addEventListener('keydown', closeModalEvent);
  window.addEventListener('click', closeModalEvent);
};


// --- ФУНКЦИЯ Загрузка формы профиля ---
const openEditProfileModal = () => {

  modalBodyProfileName.value = profileName.textContent;
  modalBodyProfileSpecial.value = profileSpecial.textContent;

  modalBodyProfileName.focus();

  blockSubmitButton(modalProfile);

  openModal(modalProfile, modalBodyProfile);
};

// --- ФУНКЦИЯ Загрузка формы создания карточки ---
const openAddCardModal = () => {

  modalCardName.value = '';
  modalCardPath.value = '';

  modalCardName.focus();

  blockSubmitButton(modalNewCard);

  openModal(modalNewCard, modalBodyNewCard);
};



// --- ФУНКЦИЯ Отправка формы ---
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = modalBodyProfileName.value;
  profileSpecial.textContent = modalBodyProfileSpecial.value;

  closeModal(modalProfile, modalBodyProfile);
};

// --- ФУНКЦИЯ Генерация карточки ---
const createCard = (cardData) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Карточка ${cardData.name}`;

  // СОБЫТИЕ ЛАЙК
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  // СОБЫТИЕ УДАЛЕНИЕ
  cardElement.querySelector('.card__delete').addEventListener('click', (evt) => {
    const card = evt.target.closest('.cards__item');
    card.remove();
  });

  //СОБЫТИЕ ОТКРЫТИЕ БОЛЬШОЙ КАРТОЧКИ
  cardImage.addEventListener('click', () => {
    modalCardImage.src = cardData.link;
    modalCardImage.alt = `Карточка ${cardData.name}`;
    modalSign.textContent = cardData.name;

    openModal(modalImage, modalBodyImage);
  });

  return cardElement;
};

// --- ФУНКЦИЯ Добавления новой карточки ---
const addCard = (evt) => {
  evt.preventDefault();

  const cardData = {
    name: cardTitle.value,
    link: cardLink.value
  };

  cardsList.prepend(createCard(cardData));

  closeModal(modalNewCard, modalBodyNewCard);
};

// --- ФУНКЦИЯ Загрузки карточек при открытии страницы ---
const loadCards = () => {

  initialCards.forEach((item) => {
    const newCard = createCard(item);
    cardsList.append(newCard);
  });

};

loadCards();

// ---БЛОК ОБРАБОТКИ СОБЫТИЙ ---

profileEditButton.addEventListener('click', openEditProfileModal);
buttonCreateCard.addEventListener('click', openAddCardModal);

modalCloseProfile.addEventListener('click', () => closeModal(modalProfile, modalBodyProfile));
modalCloseNewCard.addEventListener('click', () => closeModal(modalNewCard, modalBodyNewCard));
modalCloseImage.addEventListener('click', () => closeModal(modalImage, modalBodyImage));

formProfile.addEventListener('submit', handleFormSubmit);

formNewCard.addEventListener('submit', addCard);
// ---