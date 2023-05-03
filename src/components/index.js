import {
  cardForm,
  popupImage,
  nameProfile,
  profileForm,
  popupProfile,
  profileTitle,
  popupNewCard,
  profileAvatar,
  cardsContainer,
  objectElements,
  profileSubtitle,
  openPopupProfile,
  openPopupNewCard,
  professionProfile,
  popupChangeAvatarImg,
  profileBtnChangeAvatarImg,
} from './data.js';
import '../pages/index.css';
import Api from './Api.js';
import UserInfo from './UserInfo.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage'
import FormValidator from './FormValidator.js'
import Card from './Card.js';
import { Section } from './Section.js'



export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '6e5640a5-11fb-4751-8dd5-68a754a9c24b'
  }
})


// ########################## создание карточки ####################################
function createCard(data) {
  const idUserInfo = updateUserData.getIdUser()
  const card = new Card(data, '#card-template', popupWithImage.open.bind(popupWithImage), idUserInfo, api.deleteCardServer.bind(api), {
    checkLikes: (like) => {
      if (!like) {
        api.likesCards(data._id)
          .then(res => {
            card.togleLikes(res)
          })
          .catch((error) => console.log(`Произошла ошибка удаления лайка: ${error}`))
      } else {
        api.likesCards(data._id, 'like')
          .then(res => {
            card.togleLikes(res)
          })
          .catch((error) => console.log(`Произошла ошибка при добавлении лайка: ${error}`))
      }
    }
  })
  return card.generate();
}


// ########################## Добавляем новую карточку через кнопку + ##############
const popup = new Popup(popupNewCard)

function addNewCard(data) {
  addNewCardForm.renderLoading(true);
  api.addNewCardServer(data.name, data.link)
    .then((card) => {
      cardsContainer.prepend(createCard(card));
      cardForm.reset();
      popup.close();
    })
    .catch((error) => console.log(`Ошибка при добовлении карточки: ${error}`))
    .finally(() => addNewCardForm.renderLoading(false));
}
// #################################################################################
// #################################################################################


const popupWithImage = new PopupWithImage(popupImage)
popupWithImage.setEventListeners() // закрываем big фото


// ########################## Изменение фотографии аватара #########################
function updateAvatarImage(data) {
  updateAvatarImageForm.renderLoading(true);
  api.changeAvatarImg(data.changeAvatarImg)
    .then((img) => {
      updateUserData.setUserInfoAvatar(img.avatar);
      updateAvatarImageForm.close()
    })
    .catch((error) =>
      console.log(
        `Произошла ошибка при попытке редактировании данных пользователя: ${error}`
      )
    )
    .finally(() => updateAvatarImageForm.renderLoading(false));
}



// #####################  Редактирование Профиля: name, about #######################
function handleProfileFormSubmit(data) {
  handleProfileForm.renderLoading(true)
  api.editUserInfo({
    name: nameProfile.value,
    about: professionProfile.value,
  })
    .then((userInfo) => {
      updateUserData.setUserInfo(userInfo);
      openPopupProf.close();
    })
    .catch((error) =>
      console.log(
        `Произошла ошибка при редактировании данных пользователя: ${error}`
      )
    )
    .finally(() => handleProfileForm.renderLoading(false));
}



// #####################  открыть popup фото аватар  ####################################
profileBtnChangeAvatarImg.addEventListener('click', () => {
  updateAvatarImageForm.open();
  popupAvatarValidate.clearInputError();
});



// #####################  аткрыть popup данные профиля  ############################
openPopupProfile.addEventListener('click', () => {
  handleProfileForm.open();
  const openPopupUserData = updateUserData.getUserInfo()
  nameProfile.value = openPopupUserData.name;
  professionProfile.value = openPopupUserData.about;
  popupProfileValidate.clearInputError();
});


// #####################  открыть popup добавление новой карточки  #################
openPopupNewCard.addEventListener('click', () => {
  addNewCardForm.open();
  popupCardValidate.clearInputError();
});


// ############################ PopupWithForm ####################################
const handleProfileForm = new PopupWithForm(popupProfile, handleProfileFormSubmit)
handleProfileForm.setEventListeners()

const addNewCardForm = new PopupWithForm(popupNewCard, addNewCard)
addNewCardForm.setEventListeners()

const updateAvatarImageForm = new PopupWithForm(popupChangeAvatarImg, updateAvatarImage);
updateAvatarImageForm.setEventListeners()


// ############################ FormValidator #####################################
const popupCardValidate = new FormValidator(objectElements, cardForm)
popupCardValidate.enableValidation();

const popupProfileValidate = new FormValidator(objectElements, profileForm)
popupProfileValidate.enableValidation();

const popupAvatarValidate = new FormValidator(objectElements, popupChangeAvatarImg)
popupAvatarValidate.enableValidation();


// ############################ Section ##########################################
const section = new Section({
  renderer: (data) => {
    const newCard = createCard(data);
    section.addItem(newCard)
  }
}, '.cards');
// #################################################################################

const updateUserData = new UserInfo(profileTitle, profileSubtitle, profileAvatar)
// #################################################################################

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, data]) => {
    updateUserData.setUserInfo(userInfo)
    section.rendererItems(data)
  })
  .catch((error) => console.log(`Ошибка при загрузке приложения: ${error}`));
