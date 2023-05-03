const openPopupNewCard = document.querySelector('.profile__add');
const popupNewCard = document.querySelector('#popup-new-card');
const popupProfile = document.querySelector('#profile-info');
const openPopupProfile = document.querySelector('.profile__edit');
const profileTitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
const profileAvatar = '.profile__avatar';
const cardsContainer = document.querySelector('.cards');
const popupImage = document.querySelector('.popup-image__background');
const popupImagePhoto = document.querySelector('.popup-image__photo');
const popupImageText = document.querySelector('.popup-image__text');
const closeButtons = document.querySelectorAll('.popup__close');
const cardTemplate = document.querySelector('#card-template').content;
const popupImageCloseClick = document.querySelector('.popup-image');
const profileForm = document.forms['form-profile'];
const nameProfile = profileForm.querySelector('#input-name')
const professionProfile = profileForm.querySelector('#input-profession');
const cardForm = document.forms['form-place'];
const namePlace = cardForm.querySelector('#input-name-place');
const linkPlace = cardForm.querySelector('#input-link');
const profileBtnChangeAvatarImg = document.querySelector('.profile__btn-change-avatar-img');
const popupChangeAvatarImg = document.querySelector('#popup-change-avatar-img');
const buttonPlus = document.querySelector('#create-new-card')
const buttonSaveUbdateAvatarImg = document.querySelector('#create-avatar-img')
const formChangeAvatar = document.querySelector('.change-avatar-img')
const inputChangeAvatarImg = formChangeAvatar.querySelector('#input-change-avatar-img')
const profileInfoButton = document.querySelector('#profile-info-button')


const objectElements = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item-error',
  errorClass: 'form__item_border-bottom-red'
};



export { openPopupProfile, profileForm, openPopupNewCard, popupNewCard, popupProfile, profileTitle, profileSubtitle, cardsContainer, popupImage, popupImagePhoto, popupImageText, closeButtons, cardTemplate, popupImageCloseClick, nameProfile, professionProfile, namePlace, linkPlace, objectElements, cardForm, popupChangeAvatarImg, buttonPlus, buttonSaveUbdateAvatarImg, profileBtnChangeAvatarImg, inputChangeAvatarImg, formChangeAvatar, profileAvatar, profileInfoButton };
