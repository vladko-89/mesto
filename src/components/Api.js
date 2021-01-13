

export default class Api {
  constructor() {
    this._base = 'https://mesto.nomoreparties.co/v1/cohort-19/';
    this._token = '11f304a7-0c18-4e6f-ac0a-f5def34dbfe2';
  }

  getUserInfo() {
    return fetch(`${this._base}users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
  }

  editUserInfo(data) {
    return fetch(`${this._base}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.user,
        about: data.specialization
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
  }

  updateAvatar(link) {
    return fetch(`${this._base}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
  }

  getInitialCards() {
    return fetch(`${this._base}cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
  }

  addNewCard(data) {
    return fetch(`${this._base}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
  }

  deleteCard(cardID) {
    return fetch(`${this._base}cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
  }

  putLike(cardID) {
    return fetch(`${this._base}cards/likes/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
  }

  deleteLike(cardID) {
    return fetch(`${this._base}cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
  }
}