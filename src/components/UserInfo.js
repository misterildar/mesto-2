export default class UserInfo {
  constructor(profileTitle, profileSubtitle, profileAvatar) {
    this._name = document.querySelector(profileTitle);
    this._about = document.querySelector(profileSubtitle);
    this._avatar = document.querySelector(profileAvatar);
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about; // меняем данные на странице
    this._avatar.src = data.avatar;
    this._id = data._id;
  }

  setUserInfoAvatar(img) {
    this._avatar.src = img; // меняем фото аватар
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    }
  }

  getIdUser() {
    return this._id
  }
}


// export default class UserInfo {
//   constructor({ profileTitle, profileSubtitle, profileAvatar }, getUserData, setUserAvatar, setUserData) {
//     this._nameSelector = profileTitle;
//     this._aboutSelector = profileSubtitle;
//     this._avatarSelector = profileAvatar; // почему это нельзя сразу записать сюда?
//     this._nameElement = document.querySelector(this._nameSelector);
//     this._aboutElement = document.querySelector(this._aboutSelector);
//     this._avatarElement = document.querySelector(this._avatarSelector);
//     // this._name = '';
//     // this._about = '';  // add info from setUserInfoLocal(obj)
//     // this._avatar = '';
//     // this._id = '';
//     this._getUserData = getUserData; //отпрапвляет запрос на сервер чтобы получить данные пользователя
//     this._setUserData = setUserData; //отпрапвляет запрос на сервер чтобы изменить name and about
//     this._setUserAvatar = setUserAvatar; // отпрапвляет запрос на сервер чтобы изменить аватар
//   }

//   _updateName() {
//     this._nameElement.textContent = this._name; // именяет данные на странице
//   }

//   _updateAbout() {
//     this._aboutElement.textContent = this._about; // именяет данные на странице
//   }

//   _updateAvatar() {
//     this._avatarElement.src = this._avatar; // именяет данные на странице
//   }

//   setUserInfoLocal(obj) {
//     this._name = obj.name;
//     this._about = obj.about;  // add info fron server
//     this._avatar = obj.avatar;
//     this._id = obj._id;
//     this._updateName();
//     this._updateAbout();
//     this._updateAvatar();
//   }

//   getUserInfo() {
//     return {
//       name: this._nameElement.textContent,
//       about: this._aboutElement.textContent,
//       avatar: this._avatarElement.src,
//     }
//   }


//   setUserInfo() {
//     return this._setUserData()
//       .then((res) => {
//         this._name = res.name;
//         this._about = res.about;
//         this._updateName();
//         this._updateAbout();
//       })
//   }

//   setUserInfoAvatar() {
//     return this._setUserAvatar()
//       .then((img) => {
//         // console.log(img)
//         this._avatar = img.avatar;
//         this._updateAvatar();
//       })
//   }

//   getIdUser() {
//     return this._id
//   }
// }



/*
принять в конструктор 3 колбека, и создать методы которые их оборачивают
1 получить данные с сервера
2 обновить наме и абоут
3 обновить аватар

написать метод обновления данных внутри класса и на странице
*/



