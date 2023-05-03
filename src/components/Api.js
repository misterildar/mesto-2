export default class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._headersJson = {
      authorization: this._headers.authorization,
      'Content-Type': 'application/json'
    }
  }

  _checkErrorPromise(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((err) => {
        err.statusCode = res.status;
        return Promise.reject(err)
      })
  };



  addNewCardServer(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headersJson,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkErrorPromise)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkErrorPromise)
  }


  likesCards(id, like) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._checkErrorPromise)
  }

  deleteCardServer(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkErrorPromise)
  }


  /////методы для работы с пользователем
  changeAvatarImg(obj) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headersJson,
      body: JSON.stringify({
        avatar: obj
      })
    })
      .then(this._checkErrorPromise)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkErrorPromise)
  }

  editUserInfo(obj) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headersJson,
      body: JSON.stringify({
        name: obj.name,
        about: obj.about
      })
    })
      .then(this._checkErrorPromise)
  }

}


