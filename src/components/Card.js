export class Card {
  constructor(data, user, cardSelector, openBigCard, handleTrashClick, handleLikeClick) {
    this._title = data.name;
    this._likes = data.likes;
    this._link = data.link;
    this._ID = data._id;
    this._owner = data.owner;
    //this._buttonLike = this.querySelector('.card__like');
    this._user = user;
    this._likesCounter = data.likes.length;
    this._cardSelector = cardSelector;
    this._openBigCard = openBigCard;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
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
  likeCard() {
    this._element.querySelector('.card__like').classList.add('card__like_active');
  }

  dislikeCard() {
    this._element.querySelector('.card__like').classList.remove('card__like_active');
  }

  _checkLike(arr = this._likes) {
    return arr.some(like => {
      return like._id === this._user._id;
    })
  }

  // Удаляем карточку
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // 

  // Получаем количество лайков при загрузке
  _getLikesCounter() {
    const likes = this._element.querySelector('.card__likes-counter');
    if (this._likesCounter === 0) {
      likes.textContent = '';
    }
    else {
      likes.textContent = this._likesCounter;
    }
  }

  setLikes(arr) {
    this._element.querySelector('.card__likes-counter').textContent = arr.length;
    this._likes = arr;
  }

  // Скрываем корзину
  _checkTrash() {
    if (this._owner._id !== this._user._id) {
      this._element.querySelector('.card__delete').classList.add('card__delete_hidden');
    }
  }

  // Создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    const title = this._element.querySelector('.card__title');
    const image = this._element.querySelector('.card__image');

    title.textContent = this._title;
    image.src = this._link;
    image.alt = `Карточка ${this._title}`;

    this.setLikes(this._likes);
    if (this._checkLike()) {
      this.likeCard();
    }

    this._getLikesCounter();

    this._setEventListeners();
    this._checkTrash();

    return this._element;
  }

  // Вешаем обработчики
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick(this._ID, this._checkLike(), this);
      console.log(this._likes);
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleTrashClick(this._ID, this);
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openBigCard(this._title, this._link);
    });
  }
}

