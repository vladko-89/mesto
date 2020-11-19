//  --- БЛОК КОНФИГУРАЦИИ ---

const config = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

// --- ФУНКЦИЯ Показать ошибку ввода---
const showInputError = (formItem, inputItem, config, errorMessage) => {
  const errorItem = formItem.querySelector(`#${inputItem.id}-error`);

  inputItem.classList.add(config.inputErrorClass);
  errorItem.textContent = errorMessage;
  errorItem.classList.add(config.errorClass);
};

// --- ФУНКЦИЯ Скрыть ошибку ввода---
const hideInputError = (formItem, inputItem, config) => {
  const errorItem = formItem.querySelector(`#${inputItem.id}-error`);

  inputItem.classList.remove(config.inputErrorClass);
  errorItem.classList.remove(config.errorClass);
  errorItem.textContent = '';
};

// --- ФУНКЦИЯ Валидация поля ввода формы --- 
const isValid = (formItem, inputItem, config) => {
  if (!inputItem.validity.valid) {
    showInputError(formItem, inputItem, config, inputItem.validationMessage);
  }
  else {
    hideInputError(formItem, inputItem, config);
  }
};

// ---- ФУНКЦИЯ Проверяем валидность всех полей текущей формы ---
const hasValidInput = (inputList) => {
  return inputList.some((inputItem) => {

    return !inputItem.validity.valid;
  });
};

// --- ФУНКЦИЯ Управляем доступностью кнопки отправки текущей формы ---
const toggleButtonState = (inputList, buttonItem, config) => {
  if (hasValidInput(inputList)) {
    buttonItem.classList.add(config.inactiveButtonClass);
  }
  else {
    buttonItem.classList.remove(config.inactiveButtonClass);
  }
};

// --- ФУНКЦИЯ Блокируем кнопку отправки формы ---
const blockSubmitButton = (popup) => {
  const buttonSubmit = popup.querySelector(config.submitButtonSelector);

  if (buttonSubmit) {
    buttonSubmit.classList.add(config.inactiveButtonClass);
  }
};

// --- ФУНКЦИЯ Подключение обработчиков событий ко всем полям формы ---
const setEventListeners = (formItem, config) => {
  const inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
  const buttonItem = formItem.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonItem, config);

  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {

      isValid(formItem, inputItem, config);

      toggleButtonState(inputList, buttonItem, config);
    });
  });
};


// --- ФУНКЦИЯ Подключаем обработчики событий ко всем формам ---
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formItem) => {
    formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formItem, config);
  });
};

enableValidation(config);



/*
// --- ФУНКЦИЯ Показать ошибку ввода---
const showInputError = (formItem, inputItem, errorMessage) => {
  const errorItem = formItem.querySelector(`#${inputItem.id}-error`);

  inputItem.classList.add('popup__input_type_error');
  errorItem.textContent = errorMessage;
  errorItem.classList.add('popup__error_active');
};

// --- ФУНКЦИЯ Скрыть ошибку ввода---
const hideInputError = (formItem, inputItem) => {
  const errorItem = formItem.querySelector(`#${inputItem.id}-error`);

  inputItem.classList.remove('popup__input_type_error');
  errorItem.classList.remove('popup__error_active');
  errorItem.textContent = '';
};

// --- ФУНКЦИЯ Валидация поля ввода формы ---
const isValid = (formItem, inputItem) => {
  if (!inputItem.validity.valid) {
    showInputError(formItem, inputItem, inputItem.validationMessage);
  }
  else {
    hideInputError(formItem, inputItem);
  }
};

// ---- ФУНКЦИЯ Проверяем валидность всех полей текущей формы ---
const hasValidInput = (inputList) => {
  return inputList.some((inputItem) => {

    return !inputItem.validity.valid;
  });
};

// --- ФУНКЦИЯ Управляем доступностью кнопки отправки текущей формы ---
const toggleButtonState = (inputList, buttonItem) => {
  if (hasValidInput(inputList)) {
    buttonItem.classList.add('popup__button-submit_disabled');
  }
  else {
    buttonItem.classList.remove('popup__button-submit_disabled');
  }
};

// --- ФУНКЦИЯ Подключение обработчиков событий ко всем полям формы ---
const setEventListeners = (formItem) => {
  const inputList = Array.from(formItem.querySelectorAll('.popup__input'));
  const buttonItem = formItem.querySelector('.popup__button-submit');

  toggleButtonState(inputList, buttonItem);

  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {

      isValid(formItem, inputItem);

      toggleButtonState(inputList, buttonItem);
    });
  });
};


// --- ФУНКЦИЯ Подключаем обработчики событий ко всем формам ---
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formItem) => {
    formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formItem);
  });
};

enableValidation(); */
