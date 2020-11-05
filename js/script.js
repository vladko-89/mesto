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

const modalCardImage = document.querySelector('.popup__card-image');
const modalSign = document.querySelector('.popup__sign');


// --- ФУНКЦИЯ плавного появления модального окна  ---
const modalProfile = document.querySelector('.popup_type_profile');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');
const modalBodyProfile = document.querySelector('.popup__body_modal_profile');
const modalBodyNewCard = document.querySelector('.popup__body_modal_new-card');
const modalBodyImage = document.querySelector('.popup__body_modal_image');

const slidePopup = (body) => {
  body.classList.toggle('popup__body_slice');
};

// --- ФУНКЦИЯ Открытие формы ---

const openModal = (popup, body) => {
  popup.classList.add('popup_show');
  slidePopup(body);
};


// --- ФУНКЦИЯ Загрузка формы профиля ---
const formProfile = modalProfile.querySelector('.popup__profile');
const modalBodyProfileName = modalProfile.querySelector('.popup__input_item_name');
const modalBodyProfileSpecial = modalProfile.querySelector('.popup__input_item_specialization');
const profileName = document.querySelector('.profile__name');
const profileSpecial = document.querySelector('.profile__specialization');

const loadProfile = () => {
  //closeForm();
  //formProfile.classList.add('form_opened');
  modalBodyProfileName.value = profileName.textContent;
  modalBodyProfileSpecial.value = profileSpecial.textContent;
  modalBodyProfileName.focus();
  openModal(modalProfile, modalBodyProfile);
};

// --- ФУНКЦИЯ Закрываю все открытые формы ---
/*const forms = document.querySelectorAll('.form');

const closeForm = () => {
  forms.forEach((item) => {
    item.classList.remove('form_opened');
  });
};*/

// --- ФУНКЦИЯ Загрузка формы создания карточки ---
const formNewCard = modalNewCard.querySelector('.popup__new-card');
const modalCardName = modalNewCard.querySelector('.popup__input_item_title');
const modalCardPath = modalNewCard.querySelector('.popup__input_item_path');

const loadNewCard = () => {
  //closeForm();
  modalCardName.value = '';
  modalCardPath.value = '';
  //formNewCard.classList.add('form_opened');
  modalCardName.focus();
  openModal(modalNewCard, modalBodyNewCard);
};

// --- ФУНКЦИЯ Закрытие формы ---
function closeModal(popup, body) {
  slidePopup(body);
  popup.classList.remove('popup_show');
}

// --- ФУНКЦИЯ Отправка формы ---
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = modalBodyProfileName.value;
  profileSpecial.textContent = modalBodyProfileSpecial.value;
  closeModal(modalProfile, modalBodyProfile);
};

// --- ФУНКЦИЯ Генерация карточки ---
const cardTitle = document.querySelector('.popup__input_item_title');
const cardLink = document.querySelector('.popup__input_item_path');
const cardsList = document.querySelector('.cards');

const createCard = (object) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image')
  cardElement.querySelector('.card__title').textContent = object.name;
  cardImage.src = object.link;
  // СОБЫТИЕ ЛАЙК
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  // СОБЫТИЕ УДАЛЕНИЕ
  cardElement.querySelector('.card__delete').addEventListener('click', (evt) => {
    const card = evt.target.closest('.cards__item');
    card.remove();
  });


  cardImage.addEventListener('click', () => {
    modalCardImage.src = object.link;
    modalSign.textContent = object.name;

    openModal(modalImage, modalBodyImage);
  });

  return cardElement;
};

// --- ФУНКЦИЯ Добавления новой карточки ---
const addCard = (evt) => {
  evt.preventDefault();
  const object = {
    name: cardTitle.value,
    link: cardLink.value
  }

  cardsList.prepend(createCard(object));

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
const profileEditButton = document.querySelector('.profile__button-edit');
profileEditButton.addEventListener('click', loadProfile);

const buttonCreateCard = document.querySelector('.profile__button-new-card');
buttonCreateCard.addEventListener('click', loadNewCard);

const modalCloseProfile = document.querySelector('.popup__button-close_modal_profile');
modalCloseProfile.addEventListener('click', () => closeModal(modalProfile, modalBodyProfile));

const modalCloseNewCard = document.querySelector('.popup__button-close_modal_new-card');
modalCloseNewCard.addEventListener('click', () => closeModal(modalNewCard, modalBodyNewCard));

const modalCloseImage = document.querySelector('.popup__button-close_modal_image');
modalCloseImage.addEventListener('click', () => closeModal(modalImage, modalBodyImage));

formProfile.addEventListener('submit', handleFormSubmit);

formNewCard.addEventListener('submit', addCard);
