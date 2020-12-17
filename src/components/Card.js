export class Card {
  constructor(data, cardSelector, openBigCard) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openBigCard = openBigCard
  }
  // Получаем шаблон разметки 
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }
  //Ставим/снимаем Лайк
  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }
  // Удаляем карточку
  _deleteCard() {
    this._element.remove();
  }

  // Вешаем обработчики
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openBigCard(this._title, this._link);
    });
  }
  // Создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    const title = this._element.querySelector('.card__title');
    const image = this._element.querySelector('.card__image');

    title.textContent = this._title;
    image.src = this._link;
    image.alt = `Карточка ${this._title}`;

    this._setEventListeners();

    return this._element;
  }
}

