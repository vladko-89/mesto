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
const modalForm = document.querySelector('.popup_type_form');
const modalImage = document.querySelector('.popup_type_image');
const modalBodyForm = document.querySelector('.popup__body_modal_form');
const modalBodyImage = document.querySelector('.popup__body_modal_image');

const popupSlice = (body) => {
  body.classList.toggle('popup__body_slice');
}




// --- ФУНКЦИЯ Открытие формы ---

const openModal = (popup, body) => {
  popup.classList.add('popup_show');
  popupSlice(body);
}


// --- ФУНКЦИЯ Загрузка формы профиля ---
const formProfile = modalForm.querySelector('.popup__profile');
const modalBodyFormName = modalForm.querySelector('.popup__input_item_name');
const modalBodyFormSpecial = modalForm.querySelector('.popup__input_item_specialization');
const profileName = document.querySelector('.profile__name');
const profileSpecial = document.querySelector('.profile__specialization');

const loadProfile = () => {
  closeForm();
  formProfile.classList.add('form_opened');
  modalBodyFormName.value = profileName.textContent;
  modalBodyFormSpecial.value = profileSpecial.textContent;
  modalBodyFormName.focus();
  openModal(modalForm, modalBodyForm);
}

// --- ФУНКЦИЯ Закрываю все открытые формы ---
const forms = document.querySelectorAll('.form');

const closeForm = () => {
  forms.forEach((item) => {
    item.classList.remove('form_opened');
  });
}

// --- ФУНКЦИЯ Загрузка формы создания карточки ---
const formNewCard = modalForm.querySelector('.popup__new-card');
const modalCardName = modalForm.querySelector('.popup__input_item_title');
const modalCardPath = modalForm.querySelector('.popup__input_item_path');

const loadNewCard = () => {
  closeForm();
  modalCardName.value = '';
  modalCardPath.value = '';
  formNewCard.classList.add('form_opened');
  modalCardName.focus();
  openModal(modalForm, modalBodyForm);
}

// --- ФУНКЦИЯ Закрытие формы ---
function closeModal(popup, body) {
  popupSlice(body);
  popup.classList.remove('popup_show');
}




// --- ФУНКЦИЯ Отправка формы ---
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = modalBodyFormName.value;
  profileSpecial.textContent = modalBodyFormSpecial.value;
  closeModal(modalForm, modalBodyForm);
}

// --- ФУНКЦИЯ Генерация карточки ---
const cardTitle = document.querySelector('.popup__input_item_title');
const cardLink = document.querySelector('.popup__input_item_path');
const cardsList = document.querySelector('.cards');


const createCard = (title, path) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').src = path;
  // СОБЫТИЕ ЛАЙК
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  // СОБЫТИЕ УДАЛЕНИЕ
  cardElement.querySelector('.card__delite').addEventListener('click', (evt) => {
    const card = evt.target.closest('.cards__item');
    card.remove();
  });

  const modalCardImage = document.querySelector('.popup__card-image');
  const modalSign = document.querySelector('.popup__sign');

  cardElement.querySelector('.card__image').addEventListener('click', (evt) => {
    modalCardImage.src = path;
    modalSign.textContent = title;

    openModal(modalImage, modalBodyImage);
  });
  cardsList.prepend(cardElement);
}

// --- ФУНКЦИЯ Добавления новой карточки ---
const addCard = (evt) => {
  evt.preventDefault();
  let title = cardTitle.value;
  let path = cardLink.value;
  createCard(title, path);
  closeModal(modalForm, modalBodyForm);
}

// --- ФУНКЦИЯ Загрузки карточек при открытии страницы ---
const loadCards = () => {
  initialCards.forEach((item) => {
    let title = item.name;
    let path = item.link;
    createCard(title, path);
  });
}

loadCards();

const modalBody = document.querySelector('.popup__body');

// ---БЛОК ОБРАБОТКИ СОБЫТИЙ ---
const profileEditButton = document.querySelector('.profile__button-edit');
profileEditButton.addEventListener('click', loadProfile);

const buttonCreateCard = document.querySelector('.profile__button-new-card');
buttonCreateCard.addEventListener('click', loadNewCard);

const modalCloseButton = document.querySelector('.popup__button-close_modal_form');
modalCloseButton.addEventListener('click', () => closeModal(modalForm, modalBodyForm));

const modalCloseImage = document.querySelector('.popup__button-close_modal_image');
modalCloseImage.addEventListener('click', () => closeModal(modalImage, modalBodyImage));

formProfile.addEventListener('submit', formSubmitHandler);

formNewCard.addEventListener('submit', addCard);
