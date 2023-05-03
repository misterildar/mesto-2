export default class Card {
  constructor(data, selector, handleCardClick, idUserInfo, deleteCard, { checkLikes }) {
    this._title = data.name;
    this._image = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._useIdCard = data.owner._id;
    this._userId = idUserInfo;
    this._selector = selector;
    this._deleteCardServer = deleteCard;
    this._checkLikes = checkLikes
    this._handleCardClick = handleCardClick;

  }

  _getElement() {
    const card = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true)
    return card
  }

  generate() {
    this._element = this._getElement();
    this._cardImg = this._element.querySelector('.card__img');
    this._cardImg.src = this._image;
    this._cardImg.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._likeCard = this._element.querySelector('.card__heart');
    this._buttonDeleteCard = this._element.querySelector('.card__trash');
    this._numberLikeCard = this._element.querySelector('.card__number-like');
    this._showLikeCard()


    if (this._useIdCard === this._userId) {
      this._buttonDeleteCard.classList.add('card__trash_visible');
    }


    if (this._likes.some(item => item._id === this._userId)) {
      this._likeCard.classList.add('card__heart_checked')
    }

    this._setEventListeners();

    return this._element;
  }

  _changeLikeCard() {
    return this._likes.some(item => item._id === this._userId);
  }

  _showLikeCard() {
    if (this._likes.length > 0) {
      this._numberLikeCard.textContent = this._likes.length;
    }
  }

  remove() {
    this._element.remove();
  }

  _deleteCard() {
    this._deleteCardServer(this._cardId)
      .then(() => {
        this.remove()
      })
  }

  togleLikes(res) {
    this._likes = res.likes
    this.changeLike()
  }

  changeLike() {
    this._numberLikeCard.textContent = this._likes.length
    this._likeCard.classList.toggle('card__heart_checked')
  }

  _checkLike() {
    if (this._changeLikeCard()) {
      this._checkLikes()
    } else {
      this._checkLikes('like')
    }
  }

  _setEventListeners() {
    this._likeCard.addEventListener('click', () => {
      this._checkLike()
    });

    this._buttonDeleteCard.addEventListener('click', this._deleteCard.bind(this));

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  }
}







